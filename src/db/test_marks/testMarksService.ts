import { Programs, Plans, TestMarks, Tests } from "@db/models";
import { PaginatedResult, SequelizeReturning, SequelizeRowsAndCount } from "@db/types";
import { Plan, Program, Test, TestMark, TestMarkWithTestAndPlan, TestMarkWithTestAndProgram } from "@db/interfaces";
import plansService from "@db/plans/plansService";
import { Id } from "@projectTypes/database";

interface CourseTestMark {
  id: string;
  title: string;
  mark: number;
  course: string;
}

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
  getCourseMarks: async (planId: Id, page: number, limit: number): Promise<PaginatedResult<CourseTestMark>> => {
    const attributes: Array<keyof TestMark> = ['mark', 'plan_id', 'test_id'];

    const data: SequelizeRowsAndCount<TestMarkWithTestAndPlan> = await TestMarks.findAndCountAll({
      attributes,
      offset: (page - 1) * limit,
        limit,
      where: {
        plan_id: planId
      },
      include: [
        {
          model: Tests,
          as: 'test'
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
    }) as unknown as SequelizeRowsAndCount<TestMarkWithTestAndPlan>;

    const marks: CourseTestMark[] = data.rows.map(mark => ({
      id: `${mark.dataValues.plan.dataValues.id}-${mark.dataValues.test.dataValues.id}`,
      title: `Тест: "${mark.dataValues.test.dataValues.title}"`,
      mark: mark.dataValues.mark,
      course: mark.dataValues.plan.dataValues.program.dataValues.title
    }));

    return {
      rows: marks,
      totalRecords: data.count
    }
  },
  getStudentMarks: async (studentId: Id, page: number, limit: number): Promise<PaginatedResult<CourseTestMark>> => {
    const attributes: Array<keyof TestMark> = ['mark', 'plan_id', 'test_id'];

    const plans: SequelizeReturning<Plan>[] = await Plans.findAll({
      attributes: ['id'],
      where: {
        'student_id': studentId
      }
    }) as unknown as SequelizeReturning<Plan>[];
    const plansIds = plans.map(plan => plan.dataValues.id);

    const data: SequelizeRowsAndCount<TestMarkWithTestAndPlan> = await TestMarks.findAndCountAll({
      attributes,
      offset: (page - 1) * limit,
        limit,
      where: {
        plan_id: plansIds
      },
      include: [
        {
          model: Tests,
          as: 'test'
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
    }) as unknown as SequelizeRowsAndCount<TestMarkWithTestAndPlan>;

    const marks: CourseTestMark[] = data.rows.map(mark => ({
      id: `${mark.dataValues.plan.dataValues.id}-${mark.dataValues.test.dataValues.id}`,
      title: `Тест: "${mark.dataValues.test.dataValues.title}"`,
      mark: mark.dataValues.mark,
      course: mark.dataValues.plan.dataValues.program.dataValues.title
    }));

    return {
      rows: marks,
      totalRecords: data.count
    }
  }
};

export default testMarksService;
