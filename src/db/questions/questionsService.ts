import { Programs, Teachers, Questions, Tests } from "@db/models";
import {
  PaginatedResult,
  SequelizeReturning,
  SequelizeRowsAndCount,
} from "@db/types";
import { Program, Teacher, ProgramWithTeacher, Question, QuestionWithTest, Test } from "@db/interfaces";

const questionsService = {
  add: async (question: Omit<Question, "id">): Promise<Question> => {
    const fields: Array<keyof Omit<Question, "id">> = [
      "description",
      "test_id",
    ];

    const created: SequelizeReturning<Question> = (await Questions.create(
      question,
      {
        fields,
        returning: true,
      }
    )) as unknown as SequelizeReturning<Question>;

    return created.dataValues;
  },
  getAllBy: async <T extends keyof Question>(
    field: T,
    value: Question[T]
  ): Promise<QuestionWithTest[]> => {
    const data: SequelizeReturning<
    Question & {
      test: SequelizeReturning<Test>;
    }
    >[] = (await Questions.findAll({
      where: {
        [field]: value,
      },
      include: {
        model: Tests,
        as: "test",
      },
    })) as unknown as SequelizeReturning<
    Question & {
      test: SequelizeReturning<Test>;
    }
    >[];

    return data.map(({ dataValues }) => ({
      ...dataValues,
      test: dataValues.test.dataValues,
    }));
  },
  get: async (id: Question["id"]): Promise<QuestionWithTest | null> => {
    const data: SequelizeReturning<
      Question & {
        test: SequelizeReturning<Test>;
      }
    > | null = (await Questions.findByPk(id, {
      include: {
        model: Tests,
        as: "test",
      },
    })) as unknown as SequelizeReturning<
    Question & {
      test: SequelizeReturning<Test>;
    }
    > | null;

    return data?.dataValues
      ? {
          ...data.dataValues,
          test: data.dataValues.test.dataValues,
        }
      : null;
  },
};

export default questionsService;
