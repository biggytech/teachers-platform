import testsSchema from "@db/tests/testsSchema";
import {
  createLimitedSelectQuery,
  createSelectByQuery,
  createSimpleInsertQuery,
  executeQuery,
} from "@services/db";
import questionsSchema from "./questionsSchema";

export const getQuestions = async ({ columns, testId }) => {
  const query = createSelectByQuery({
    schema: questionsSchema,
    columns,
    searchColumn: questionsSchema.column("test_id").name,
    searchValue: testId,
  });

  const results = await executeQuery(query);

  return results.rows;
};

export const getQuestion = async ({ columns, id }) => {
  const query = createLimitedSelectQuery({
    schema: questionsSchema,
    columns,
    searchValue: id,
    limit: 1,
  });

  const results = await executeQuery(query);

  return results.rows[0] ?? null;
};

export const addQuestion = async ({ columns, testId }) => {
  const query = createSimpleInsertQuery({
    schema: questionsSchema,
    columns: columns.concat({
      name: questionsSchema.column("test_id").name,
      value: testId,
    }),
  });

  await executeQuery(query);
};
