import schema from "@db/points/schema";
import programsSchema from "@db/programs/schema";
import { executeQuery } from "@services/db";
import { ColumnValue } from "@db/Schema";
import {
  createSimpleInsertQuery,
  createLimitedSelectQuery,
  createJoinedQuery,
} from "@services/db";

const getPointsWithPrograms = async ({ programId, columns, programColumn }) => {
  const query = createJoinedQuery({
    schema1: schema,
    schema2: programsSchema,
    field1: schema.column("program_id"),
    field2: programsSchema.column("id"),
    columns1: columns,
    columns2: [
      {
        name: `${programsSchema.column("title").name} ${programColumn}`,
      },
    ],
    where: {
      column: schema.column("program_id"),
      value: programId,
    },
  });

  return (await executeQuery(query)).rows;
};

export const addPoint = async ({
  columns,
}: {
  columns: Array<ColumnValue>;
}) => {
  const query = createSimpleInsertQuery({ schema, columns });

  await executeQuery(query);
};

export const getPoint = async ({ id, columns }) => {
  const query = createLimitedSelectQuery({ schema, columns, searchValue: id });

  const results = await executeQuery(query);

  return results.rows[0] ?? null;
};

export { getPointsWithPrograms };
