import { Points, Programs, TaskMarks, Tasks, Plans, TestMarks, Tests } from "@db/models";
import { SequelizeReturning } from "@db/types";
import { Point, PointWithProgram, Program, TaskMark, TaskMarkWithTaskAndProgram, Test, Task, Plan, PlanWithStudentAndProgram, TestMark, TestMarkWithTestAndProgram } from "@db/interfaces";
import plansService from "@db/plans/plansService";

const testMarksService = {
  add: async (testMark: Omit<TestMark, "id">): Promise<TestMark> => {
    const fields: Array<keyof Omit<TestMark, "id">> = [
      "mark",
      "test_id",
      "plan_id",
    ];

    const created: SequelizeReturning<TestMark> = (await TestMarks.create(testMark, {
      fields,
      returning: true,
    })) as unknown as SequelizeReturning<TestMark>;

    return created.dataValues;
  },
  getAllByPlanId: async (planId: number): Promise<TestMarkWithTestAndProgram[]> => {
    const plans = await plansService.getAllBy('id', planId);
    const plansIds = plans.map(plan => plan.id);

    if (!plansIds.length) return [];

    const data: SequelizeReturning<
    TestMark & {
        test: SequelizeReturning<Test>;
        program: SequelizeReturning<Program>;
      }
    >[] = (await TestMarks.findAll({
      where: {
        'plan_id': plansIds,
      },
      include: [
        {
          model: Tests,
          as: "test",
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
    TestMark & {
      test: SequelizeReturning<Test>;
      program: SequelizeReturning<Program>;
    }
    >[];

    // @ts-ignore
    return data.map(({ dataValues }) => {
      // @ts-ignore
      const { test, plan, ...other} = dataValues;
      return ({
        ...other,
        test: test.dataValues,
        // @ts-ignore // TODO: fix types
        program: plan.dataValues.program.dataValues
      })
    });
  },
};

export default testMarksService;
