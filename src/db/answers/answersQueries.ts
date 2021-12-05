import {
  createSelectByQuery,
  createSimpleInsertQuery,
  executeQuery,
} from "@services/db";
import answersSchema from "./answersSchema";

export const getAnswers = async ({ columns, questionId }) => {
  const query = createSelectByQuery({
    schema: answersSchema,
    columns,
    searchColumn: answersSchema.column("question_id").name,
    searchValue: questionId,
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
