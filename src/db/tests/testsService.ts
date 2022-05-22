import { Tests, TestsPoints, Points, TaskMarks, Programs, Plans, TestMarks } from "@db/models";
import {
  PaginatedResult,
  SequelizeReturning,
  SequelizeRowsAndCount,
} from "@db/types";
import { Test, TestWithPoint, TestPoint, Point, TestWithPointsAndMarks, Plan } from "@db/interfaces";
import { Id } from "@projectTypes/database";

interface CourseTestWithMark {
  id: Id;
  title: string;
  description?: string;
  course: string;
  point: string;
  mark: number | string;
}

const testsService = {
  add: async (test: Omit<Test, "id">, pointId: number): Promise<Test> => {
    const fields: Array<keyof Omit<Test, "id">> = [
      "title",
      "description",
    ];

    const created: SequelizeReturning<Test> = (await Tests.create(
      test,
      {
        fields,
        returning: true,
      }
    )) as unknown as SequelizeReturning<Test>;

    const createdTest = created.dataValues;
    const testId = createdTest.id;

    await TestsPoints.create({
      test_id: testId,
      point_id: pointId
    })

    return createdTest;
  },
  getAllByPointId: async (pointId: number): Promise<TestWithPoint[]> => {
    const testsPoints = await TestsPoints.findAll({
      where: {
        'point_id': pointId
      },
    }) as unknown as SequelizeReturning<TestPoint>[];
    const testsIds = testsPoints.map(testPoint => testPoint.dataValues.test_id);

    if (!testsIds.length) return [];

    const data: SequelizeReturning<
    Test & {
      points: SequelizeReturning<Point>;
      }
    >[] = (await Tests.findAll({
      where: {
        'id': testsIds,
      },
      include: [
        {
          model: Points,
          as: "points",
        },
      ],
    })) as unknown as SequelizeReturning<
    Test & {
      points: SequelizeReturning<Point>;
    }
    >[];

    return data.map(({ dataValues }) => {
      const { points, ...other} = dataValues;
      const point = dataValues.points[0]?.dataValues ?? null;
      if (point) {
        delete point.TestsPoints;
      }
      return ({
        ...other,
        point
      });
    });
  },
  get: async (id: Test["id"]): Promise<Test | null> => {
    const data: SequelizeReturning<
      Test
    > | null = (await Tests.findByPk(id)) as unknown as SequelizeReturning<
      Test
    > | null;

    return data?.dataValues ?? null;
  },
  getCourseTests: async (planId: Id, page: number, limit: number): Promise<PaginatedResult<CourseTestWithMark>> => {
    const attributes: Array<keyof Test> = ['id', 'title', 'description'];

    const data: SequelizeRowsAndCount<TestWithPointsAndMarks> = await Tests.findAndCountAll({
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
            },
            {
              model: TestMarks,
              as: 'testMarks',
              required: false,
              where: {
                plan_id: planId
              }
            }
        ]
    }) as unknown as SequelizeRowsAndCount<TestWithPointsAndMarks>;

    const tests: CourseTestWithMark[] = data.rows.map(test => {
      return {
        id: test.dataValues.id,
        title: test.dataValues.title,
        description: test.dataValues.description,
        course: test.dataValues.points[0].dataValues.program.dataValues.title,
        point: test.dataValues.points[0].dataValues.title,
        mark: test.dataValues.testMarks[0]?.dataValues.mark ?? '-'
      }
    });

    return {
      rows: tests,
      totalRecords: data.count
    }
  },
  getStudentTests: async (studentId: Id, page: number, limit: number): Promise<PaginatedResult<CourseTestWithMark>> => {
    const attributes: Array<keyof Test> = ['id', 'title', 'description'];

    const plans: SequelizeReturning<Plan>[] = await Plans.findAll({
      attributes: ['id'],
      where: {
        'student_id': studentId
      }
    }) as unknown as SequelizeReturning<Plan>[];
    const plansIds = plans.map(plan => plan.dataValues.id);

    const data: SequelizeRowsAndCount<TestWithPointsAndMarks> = await Tests.findAndCountAll({
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
                        id: plansIds
                      }
                    }
                  ]
                }
              ]
            },
            {
              model: TestMarks,
              as: 'testMarks',
              required: false,
              where: {
                plan_id: plansIds
              }
            }
        ]
    }) as unknown as SequelizeRowsAndCount<TestWithPointsAndMarks>;

    const tests: CourseTestWithMark[] = data.rows.map(test => {
      return {
        id: test.dataValues.id,
        title: test.dataValues.title,
        description: test.dataValues.description,
        course: test.dataValues.points[0].dataValues.program.dataValues.title,
        point: test.dataValues.points[0].dataValues.title,
        mark: test.dataValues.testMarks[0]?.dataValues.mark ?? '-'
      }
    });

    return {
      rows: tests,
      totalRecords: data.count
    }
  },
};

export default testsService;
