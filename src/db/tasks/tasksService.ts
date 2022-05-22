import { Tasks, TasksPoints, Points, TaskMarks, Programs, Plans } from "@db/models";
import {
  PaginatedResult,
  SequelizeReturning,
  SequelizeRowsAndCount,
} from "@db/types";
import { Task, TaskWithPoints, TaskPoint, Point, Plan } from "@db/interfaces";
import { Id } from "@projectTypes/database";

interface CourseTask {
  id: Id;
  title: string;
  description?: string;
  course: string;
  point: string;
}

const tasksService = {
  add: async (task: Omit<Task, "id">, pointId: number): Promise<Task> => {
    const fields: Array<keyof Omit<Task, "id">> = [
      "title",
      "description",
    ];

    const created: SequelizeReturning<Task> = (await Tasks.create(
      task,
      {
        fields,
        returning: true,
      }
    )) as unknown as SequelizeReturning<Task>;

    const createdTask = created.dataValues;
    const taskId = createdTask.id;

    await TasksPoints.create({
      task_id: taskId,
      point_id: pointId
    })

    return createdTask;
  },
  getAllByPointId: async (pointId: number): Promise<TaskWithPoints[]> => {
    const tasksPoints = await TasksPoints.findAll({
      where: {
        'point_id': pointId
      },
    }) as unknown as SequelizeReturning<TaskPoint>[];
    const tasksIds = tasksPoints.map(taskPoint => taskPoint.dataValues.task_id);

    if (!tasksIds.length) return [];

    const data: SequelizeReturning<
    Task & {
      points: SequelizeReturning<Point>;
      }
    >[] = (await Tasks.findAll({
      where: {
        'id': tasksIds,
      },
      include: [
        {
          model: Points,
          as: "points",
        },
      ],
    })) as unknown as SequelizeReturning<
    Task & {
      points: SequelizeReturning<Point>;
    }
    >[];

    return data.map(({ dataValues }) => {
      const { points, ...other} = dataValues;
      const point = dataValues.points[0]?.dataValues ?? null;
      if (point) {
        delete point.TasksPoints;
      }
      return ({
        ...other,
        point
      });
    });
  },
  getAllToMark: async (planId: number, pointId: number): Promise<Task[]> => {
    const tasksPoints = await TasksPoints.findAll({
      where: {
        'point_id': pointId
      },
    }) as unknown as SequelizeReturning<TaskPoint>[];
    const tasksIds = tasksPoints.map(taskPoint => taskPoint.dataValues.task_id);

    if (!tasksIds.length) return [];

    const data: SequelizeReturning<
    Task & {
      taskMarks: SequelizeReturning<TaskMarks>;
      }
    >[] = (await Tasks.findAll({
      where: {
        'id': tasksIds,
      },
      include: [
        {
          model: TaskMarks,
          as: "taskMarks",
        },
      ],
    })) as unknown as SequelizeReturning<
    Task & {
      taskMarks: SequelizeReturning<TaskMarks>;
    }
    >[];

    return data.filter(({ taskMarks }) => taskMarks.length === 0).map(({ dataValues }) => dataValues);
  },
  getCourseTasks: async (planId: Id, page: number, limit: number): Promise<PaginatedResult<CourseTask>> => {
    const attributes: Array<keyof Task> = ['id', 'title', 'description'];

    const data: SequelizeRowsAndCount<TaskWithPoints> = await Tasks.findAndCountAll({
      attributes,
      offset: (page - 1) * limit,
        limit,
        subQuery: false, // DEVNOTE: to fix this issue: https://github.com/sequelize/sequelize/issues/11617
        include: [
            {
              model: Points,
              as: 'points',
              required: true,
              include: [
                {
                  model: Programs,
                  as: 'program',
                  required: true,
                  include: [
                    {
                      model: Plans,
                      as: 'plans',
                      required: true,
                      where: {
                        id: planId
                      }
                    }
                  ]
                }
              ]
            }
        ]
    }) as unknown as SequelizeRowsAndCount<TaskWithPoints>;

    const tasks: CourseTask[] = data.rows.map(task => {
      return {
        id: task.dataValues.id,
        title: task.dataValues.title,
        description: task.dataValues.description,
        course: task.dataValues.points[0].dataValues.program.dataValues.title,
        point: task.dataValues.points[0].dataValues.title,
      }
    });

    return {
      rows: tasks,
      totalRecords: data.count
    }
  },
  getStudentTasks: async (studentId: Id, page: number, limit: number): Promise<PaginatedResult<CourseTask>> => {
    const attributes: Array<keyof Task> = ['id', 'title', 'description'];

    const data: SequelizeRowsAndCount<TaskWithPoints> = await Tasks.findAndCountAll({
      attributes,
      offset: (page - 1) * limit,
        limit,
        subQuery: false, // DEVNOTE: to fix this issue: https://github.com/sequelize/sequelize/issues/11617
        include: [
            {
              model: Points,
              as: 'points',
              required: true,
              include: [
                {
                  model: Programs,
                  as: 'program',
                  required: true,
                  include: [
                    {
                      model: Plans,
                      as: 'plans',
                      required: true,
                      where: {
                        'student_id': studentId
                      }
                    }
                  ]
                }
              ]
            }
        ]
    }) as unknown as SequelizeRowsAndCount<TaskWithPoints>;

    const tasks: CourseTask[] = data.rows.map(task => {
      return {
        id: task.dataValues.id,
        title: task.dataValues.title,
        description: task.dataValues.description,
        course: task.dataValues.points[0].dataValues.program.dataValues.title,
        point: task.dataValues.points[0].dataValues.title,
      }
    });

    return {
      rows: tasks,
      totalRecords: data.count
    }
  },
};

export default tasksService;
