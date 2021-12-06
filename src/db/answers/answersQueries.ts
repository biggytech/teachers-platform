import questionsSchema from "@db/questions/questionsSchema";
import {
  createJoinedQuery,
  createSimpleInsertQuery,
  executeQuery,
} from "@services/db";
import answersSchema from "./answersSchema";

export const getAnswers = async ({ columns, questionId, questionColumn }) => {
  const query = createJoinedQuery({
    schema1: answersSchema,
    schema2: questionsSchema,
    columns1: columns,
    columns2: [
      {
        name: `${questionsSchema.column("description").name} ${questionColumn}`,
      },
    ],
    field1: answersSchema.column("question_id"),
    field2: questionsSchema.column("id"),
    where: {
      column: answersSchema.column("question_id"),
      value: questionId,
    },
  });

  const results = await executeQuery(query);

  return results.rows;
};

export const addAnswer = async ({ columns }) => {
  const query = createSimpleInsertQuery({
    schema: answersSchema,
    columns,
  });

  await executeQuery(query);
};
