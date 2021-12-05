import { ColumnValue } from "@db/Schema";
import schema from "@db/programs/schema";
import teachersSchema from "@db/teachers/schema";
import {
  executeQuery,
  createSimpleInsertQuery,
  createSelectByQuery,
} from "@services/db";

const addProgram = async ({ columns }: { columns: Array<ColumnValue> }) => {
  const query = createSimpleInsertQuery({ schema, columns });

  await executeQuery(query);
};

const getProgramsWithOwners = async ({
  columns,
  page,
  limit,
  ownerColumn,
  ownerId,
}) => {
  const offset = (+page - 1) * +limit;
  console.log(schema);
  const query = {
    text: `
      SELECT 
        (SELECT COUNT(*) FROM "${schema.name}") as total_records,
          (SELECT json_agg(t.*) FROM (
            SELECT ${columns
              .map(({ name }) => `${schema.name}.${name}`)
              .join(",")}, 
            ${teachersSchema.name}.${
      teachersSchema.column("firstname").name
    } || ' ' || ${teachersSchema.name}.${
      teachersSchema.column("lastname").name
    } ${ownerColumn} 
            FROM "${schema.name}" INNER JOIN ${teachersSchema.name} ON ${
      schema.name
    }.${schema.column("owner_id").name} = ${teachersSchema.name}.${
      teachersSchema.column("id").name
    }  AND ${schema.name}.${schema.column("owner_id").name} = $1
      ORDER BY ${schema.name}.${
      schema.column("id").name
    } ASC OFFSET ${offset} LIMIT ${limit}) 
            AS t
          ) AS rows
        ;
      `,
    values: [ownerId],
  };

  const results = await executeQuery(query);

  return {
    rows: results.rows[0]?.rows ?? [],
    totalRecords: results.rows[0]?.total_records ?? 0,
  };
};

const getProgram = async ({ id, columns, ownerColumn }) => {
  const query = {
    text: `
      SELECT ${columns.map(({ name }) => `${schema.name}.${name}`).join(",")}, 
        ${teachersSchema.name}.${
      teachersSchema.column("firstname").name
    } || ' ' || ${teachersSchema.name}.${
      teachersSchema.column("lastname").name
    } ${ownerColumn} 
        FROM "${schema.name}" INNER JOIN ${teachersSchema.name} ON ${
      schema.name
    }.${schema.column("owner_id").name} = ${teachersSchema.name}.${
      teachersSchema.column("id").name
    } 
        WHERE ${schema.name}.${schema.column("id").name}=$1 LIMIT 1;
      `,
    values: [id],
  };

  const results = await executeQuery(query);

  return results.rows[0] ?? null;
};

export const getProgramsByTeacher = async ({ columns, teacherId }) => {
  const query = createSelectByQuery({
    schema,
    columns,
    searchValue: teacherId,
    searchColumn: schema.column("owner_id").name,
  });

  const results = await executeQuery(query);

  return results.rows;
};

export { addProgram, getProgramsWithOwners, getProgram };
