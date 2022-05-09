import { Tests, TestsPoints, Points, TaskMarks } from "@db/models";
import {
  PaginatedResult,
  SequelizeReturning,
  SequelizeRowsAndCount,
} from "@db/types";
import { Test, TestWithPoint, TestPoint, Point } from "@db/interfaces";

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
};

export default testsService;
