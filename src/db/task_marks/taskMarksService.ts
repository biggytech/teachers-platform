import { Points, Programs, TaskMarks, Tasks, Plans } from "@db/models";
import { SequelizeReturning } from "@db/types";
import { Point, PointWithProgram, Program, TaskMark, TaskMarkWithTaskAndProgram, Task, Plan, PlanWithStudentAndProgram } from "@db/interfaces";
import plansService from "@db/plans/plansService";

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
        // @ts-ignore // TODO: fix types
        program: plan.dataValues.program.dataValues
      })
    });
  },
};

export default taskMarksService;
