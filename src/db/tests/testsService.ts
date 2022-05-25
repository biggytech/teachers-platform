import { Tests, TestsPoints, Points, TaskMarks, Programs, Plans, TestMarks, Questions, Answers } from "@db/models";
import {
  PaginatedResult,
  SequelizeReturning,
  SequelizeRowsAndCount,
} from "@db/types";
import { Test, TestWithPoint, TestPoint, Point, TestWithPointsAndMarks, Plan, TestWithQuestionsAndAnswers, TestWithFullQuestionsAndAnswers } from "@db/interfaces";
import { Id } from "@projectTypes/database";
import intersection from 'lodash.intersection';
import testMarksService from "@db/test_marks/testMarksService";
import logger from "@logger";

interface CourseTestWithMark {
  id: Id;
  title: string;
  description?: string;
  course: string;
  point: string;
  mark: number | string;
}

export interface TestForExecution {
  id: Id;
  title: string;
  description?: string;
  mark: number | null;
  questions: Array<{
    id: Id;
    description: string;
    answers: Array<{
      id: Id;
      description: string;
    }>
  }>;
};

export interface UserAnswers {
  [key: string]: number[]
}

interface TestResult {
  totalQuestions: number;
  right: number;
  mark: number;
}

const testsService = {
  add: async (test: Omit<Test, "id">, pointId: Id): Promise<Test> => {
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
  getAllByPointId: async (pointId: Id): Promise<TestWithPoint[]> => {
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
      const { points, ...other } = dataValues;
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
  get: async (id: Id): Promise<Test | null> => {
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
        mark: test.dataValues.testMarks[0]?.dataValues.mark ?? '-',
      }
    });

    return {
      rows: tests,
      totalRecords: data.count
    }
  },
  getTestForExecution: async (testId: Id, studentId: Id): Promise<TestForExecution | null> => {
    const plans: SequelizeReturning<Plan>[] = await Plans.findAll({
      attributes: ['id'],
      where: {
        'student_id': studentId
      }
    }) as unknown as SequelizeReturning<Plan>[];
    const plansIds = plans.map(plan => plan.dataValues.id);

    const data: SequelizeReturning<TestWithQuestionsAndAnswers> = await Tests.findByPk(testId, {
      include: [
        {
          model: Questions,
          as: 'questions',
          include: [
            {
              model: Answers,
              as: 'answers'
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
    }) as unknown as SequelizeReturning<TestWithQuestionsAndAnswers>;

    if (!data) return null;

    return {
      id: data.dataValues.id,
      title: data.dataValues.title,
      description: data.dataValues.description,
      mark: data.dataValues.testMarks[0]?.dataValues.mark ?? null,
      questions: data.dataValues.questions.map(question => {
        return {
          id: question.dataValues.id,
          description: question.dataValues.description,
          answers: question.dataValues.answers.map(answer => {
            return {
              id: answer.dataValues.id,
              description: answer.dataValues.description
            };
          })
        };
      })
    }
  },
  checkTestResult: async (testId: Id, studentId: Id, userAnswers: UserAnswers): Promise<TestResult | null> => {
    const plans: SequelizeReturning<Plan>[] = await Plans.findAll({
      attributes: ['id'],
      where: {
        'student_id': studentId
      },
      limit: 1
    }) as unknown as SequelizeReturning<Plan>[];
    const planId = plans.map(plan => plan.dataValues.id)[0] ?? null;

    if (!planId) return null;

    const data: SequelizeReturning<TestWithFullQuestionsAndAnswers> = await Tests.findByPk(testId, {
      include: [
        {
          model: Questions,
          as: 'questions',
          include: [
            {
              model: Answers,
              as: 'answers'
            }
          ]
        }
      ]
    }) as unknown as SequelizeReturning<TestWithFullQuestionsAndAnswers>;

    if (!data) return null;

    const validAnswers: UserAnswers = {};
    data.dataValues.questions.forEach(question => {
      const answersIds = question.dataValues.answers.filter(answer => answer.dataValues.is_correct).map(answer => answer.dataValues.id);
      validAnswers[question.dataValues.id] = answersIds;
    });

    logger.info('Valid answers are:', validAnswers);

    let totalRight = 0;

    Object.keys(userAnswers).forEach(questionId => {
      const isRight = userAnswers[questionId].length === validAnswers[questionId].length &&
        intersection(userAnswers[questionId], validAnswers[questionId]).length === validAnswers[questionId].length;
      if (isRight) {
        totalRight++;
      }
    });

    const totalQuestions = data.dataValues.questions.length;
    const tempMark = Math.round((100 / totalQuestions) * totalRight) / 10;
    logger.info('Temp mark is:', tempMark);
    const mark = Math.min(Math.max(tempMark, 1), 10);

    await testMarksService.add({
      mark,
      test_id: testId,
      plan_id: planId
    })

    return {
      totalQuestions,
      right: totalRight,
      mark: mark
    }
  }
};

export default testsService;
