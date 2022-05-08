import { Tasks, TasksPoints, Points, TaskMarks } from "@db/models";
import {
  PaginatedResult,
  SequelizeReturning,
  SequelizeRowsAndCount,
} from "@db/types";
import { Task, TaskWithPoint, TaskPoint, Point } from "@db/interfaces";

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
  getAllByPointId: async (pointId: number): Promise<TaskWithPoint[]> => {
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
};

export default tasksService;
