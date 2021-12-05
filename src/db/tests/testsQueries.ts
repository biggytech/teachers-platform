import { ColumnValue } from "@db/Schema";
import testsSchema from "@db/tests/testsSchema";
import schema from "@db/tests/testsSchema";
import testsPointsSchema from "@db/tests_points/testsPointsSchema";
import {
  executeQuery,
  createSimpleInsertQuery,
  createJoinedQuery,
  createLimitedSelectQuery,
} from "@services/db";

export const addTest = async ({ columns, pointId }) => {
  const query = createSimpleInsertQuery({ schema, columns });

  const results = await executeQuery(query);
  const testId = results.rows[0].id;

  const query2 = createSimpleInsertQuery({
    schema: testsPointsSchema,
    returnId: false,
    columns: [
      {
        name: testsPointsSchema.column("test_id").name,
        value: testId,
      },
      {
        name: testsPointsSchema.column("point_id").name,
        value: pointId,
      },
    ],
  });

  await executeQuery(query2);
};

export const getTests = async ({ columns, pointId }) => {
  const query = createJoinedQuery({
    schema1: testsPointsSchema,
    schema2: schema,
    field1: testsPointsSchema.column("test_id"),
    field2: schema.column("id"),
    columns1: [testsPointsSchema.column("point_id")],
    columns2: columns,
    where: {
      column: testsPointsSchema.column("point_id"),
      value: pointId,
    },
  });

  const results = await executeQuery(query);

  return results.rows;
};

export const getTest = async ({ columns, id }) => {
  const query = createLimitedSelectQuery({
    schema: testsSchema,
    columns,
    searchValue: id,
    limit: 1,
  });

  const results = await executeQuery(query);

  return results.rows[0] ?? null;
};
