import { ColumnValue } from "@db/Schema";
import schema from "@db/materials/schema";
import programsSchema from "@db/programs/schema";
import { executeQuery, createSimpleInsertQuery } from "@services/db";

const addMaterial = async ({ columns }: { columns: Array<ColumnValue> }) => {
  const query = createSimpleInsertQuery({ schema, columns });

  await executeQuery(query);
};

const getMaterialsWithPrograms = async ({
  programId,
  columns,
  programColumn,
}) => {
  const query = {
    text: `
          SELECT ${columns
            .map(({ name }) => `${schema.name}.${name}`)
            .join(",")}, 
            ${programsSchema.name}.${
      programsSchema.column("title").name
    } ${programColumn} 
            FROM "${schema.name}" INNER JOIN ${programsSchema.name} ON ${
      schema.name
    }.${schema.column("program_id").name} = ${programsSchema.name}.${
      programsSchema.column("id").name
    } 
            WHERE ${schema.name}.${schema.column("program_id").name}=$1;
          `,
    values: [programId],
  };

  return (await executeQuery(query)).rows;
};

export { addMaterial, getMaterialsWithPrograms };
