import { Programs, Teachers, Questions, Tests, Answers } from "@db/models";
import {
  PaginatedResult,
  SequelizeReturning,
  SequelizeRowsAndCount,
} from "@db/types";
import { Program, Teacher, ProgramWithTeacher, Question, QuestionWithTest, Test, AnswerWithQuestion, Answer } from "@db/interfaces";

const answersService = {
  add: async (answer: Omit<Answer, "id">): Promise<Answer> => {
    const fields: Array<keyof Omit<Answer, "id">> = [
      "description",
      "is_correct",
      'question_id'
    ];

    const created: SequelizeReturning<Answer> = (await Answers.create(
      answer,
      {
        fields,
        returning: true,
      }
    )) as unknown as SequelizeReturning<Answer>;

    return created.dataValues;
  },
  getAllBy: async <T extends keyof Answer>(
    field: T,
    value: Answer[T]
  ): Promise<AnswerWithQuestion[]> => {
    const data: SequelizeReturning<
    Answer & {
      question: SequelizeReturning<Question>
    }
    >[] = (await Answers.findAll({
      where: {
        [field]: value,
      },
      include: {
        model: Questions,
        as: 'question'
      }
    })) as unknown as SequelizeReturning<
    Answer & {
      question: SequelizeReturning<Question>
    }
    >[];

    return data.map(({ dataValues }) => ({
      ...dataValues,
      question: dataValues.question.dataValues
    }));
  },
};

export default answersService;
