import { Programs, TaskMarks, Tasks, Plans } from "@db/models";
import { PaginatedResult, SequelizeReturning, SequelizeRowsAndCount } from "@db/types";
import { Program, TaskMark, Task, TaskMarkWithTaskAndPlan, Plan } from "@db/interfaces";
import plansService from "@db/plans/plansService";
import { Id } from "@projectTypes/database";

interface TaskMarkWithTaskAndProgram extends TaskMark {
  task: Task;
  program: Program;
}

interface CourseTaskMark {
  id: string;
  title: string;
  mark: number;
  course: string;
}

const taskMarksService = {
  add: async (taskMark: Omit<TaskMark, "id">): Promise<TaskMark> => {
    const fields: Array<keyof Omit<TaskMark, "id">> = [
      "mark",
      "task_id",
      "plan_id",
    ];

    const created: SequelizeReturning<TaskMark> = (await TaskMarks.create(taskMark, {
      fields,
      returning: true,
    })) as unknown as SequelizeReturning<TaskMark>;

    return created.dataValues;
  },
  getAllByPlanId: async (planId: number): Promise<TaskMarkWithTaskAndProgram[]> => {
    const plans = await plansService.getAllBy('id', planId);
    const plansIds = plans.map(plan => plan.id);

    if (!plansIds.length) return [];

    const data: SequelizeReturning<
    TaskMark & {
        task: SequelizeReturning<Task>;
        program: SequelizeReturning<Program>;
      }
    >[] = (await TaskMarks.findAll({
      where: {
        'plan_id': plansIds,
      },
      include: [
        {
          model: Tasks,
          as: "task",
        },
        {
          model: Plans,
          as: "plan",
          include: [{
            model: Programs,
            as: 'program'
          }]
        },
      ],
    })) as unknown as SequelizeReturning<
    TaskMark & {
      task: SequelizeReturning<Task>;
      program: SequelizeReturning<Program>;
    }
    >[];

    // @ts-ignore
    return data.map(({ dataValues }) => {
      // @ts-ignore
      const { task, plan, ...other} = dataValues;
      return ({
        ...other,
        task: task.dataValues,
        program: plan.dataValues.program.dataValues
      })
    });
  },
  getCourseMarks: async (planId: Id, page: number, limit: number): Promise<PaginatedResult<CourseTaskMark>> => {
    const attributes: Array<keyof TaskMark> = ['mark', 'plan_id', 'task_id'];

    const data: SequelizeRowsAndCount<TaskMarkWithTaskAndPlan> = await TaskMarks.findAndCountAll({
      attributes,
      offset: (page - 1) * limit,
        limit,
      where: {
        plan_id: planId
      },
      include: [
        {
          model: Tasks,
          as: 'task'
        },
        {
          model: Plans,
          as: 'plan',
          include: [
            {
              model: Programs,
              as: 'program'
            }
          ]
        }
      ]
    }) as unknown as SequelizeRowsAndCount<TaskMarkWithTaskAndPlan>;

    const marks: CourseTaskMark[] = data.rows.map(mark => ({
      id: `${mark.dataValues.plan.dataValues.id}-${mark.dataValues.task.dataValues.id}`,
      title: `Задание: "${mark.dataValues.task.dataValues.title}"`,
      mark: mark.dataValues.mark,
      course: mark.dataValues.plan.dataValues.program.dataValues.title
    }));

    return {
      rows: marks,
      totalRecords: data.count
    }
  },
  getStudentMarks: async (studentId: Id, page: number, limit: number): Promise<PaginatedResult<CourseTaskMark>> => {
    const attributes: Array<keyof TaskMark> = ['mark', 'plan_id', 'task_id'];

    const plans: SequelizeReturning<Plan>[] = await Plans.findAll({
      attributes: ['id'],
      where: {
        'student_id': studentId
      }
    }) as unknown as SequelizeReturning<Plan>[];
    const plansIds = plans.map(plan => plan.dataValues.id);

    const data: SequelizeRowsAndCount<TaskMarkWithTaskAndPlan> = await TaskMarks.findAndCountAll({
      attributes,
      offset: (page - 1) * limit,
        limit,
      where: {
        plan_id: plansIds
      },
      include: [
        {
          model: Tasks,
          as: 'task'
        },
        {
          model: Plans,
          as: 'plan',
          include: [
            {
              model: Programs,
              as: 'program'
            }
          ]
        }
      ]
    }) as unknown as SequelizeRowsAndCount<TaskMarkWithTaskAndPlan>;

    const marks: CourseTaskMark[] = data.rows.map(mark => ({
      id: `${mark.dataValues.plan.dataValues.id}-${mark.dataValues.task.dataValues.id}`,
      title: `Задание: "${mark.dataValues.task.dataValues.title}"`,
      mark: mark.dataValues.mark,
      course: mark.dataValues.plan.dataValues.program.dataValues.title
    }));

    return {
      rows: marks,
      totalRecords: data.count
    }
  }
};

export default taskMarksService;
