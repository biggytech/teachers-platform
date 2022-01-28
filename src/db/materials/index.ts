import { ColumnValue } from "@db/Schema";
import schema from "@db/materials/materialsSchema";
import programsSchema from "@db/programs/programsSchema";
import {
  executeQuery,
  createSimpleInsertQuery,
  createJoinedQuery,
} from "@services/db";

const addMaterial = async ({ columns }: { columns: Array<ColumnValue> }) => {
  const query = createSimpleInsertQuery({ schema, columns });

  await executeQuery(query);
};

const getMaterialsWithPrograms = async ({
  programId,
  columns,
  programColumn,
}) => {
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

export { addMaterial, getMaterialsWithPrograms };
