import { ColumnValue } from "@db/Schema";
import schema from "@db/programs/programsSchema";
import teachersSchema from "@db/teachers/schema";
import {
  executeQuery,
  createSimpleInsertQuery,
  createSelectByQuery,
  createJoinedQuery,
} from "@services/db";

const getProgramsWithOwners = async ({
  columns,
  page,
  limit,
  ownerColumn,
  ownerId,
}) => {
  const offset = (+page - 1) * +limit;
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
  const query = createJoinedQuery({
    schema1: schema,
    schema2: teachersSchema,
    field1: schema.column("owner_id"),
    field2: teachersSchema.column("id"),
    columns1: columns,
    columns2: [
      {
        name: `${teachersSchema.column("firstname").name} || 
        ' ' || 
        ${teachersSchema.name}.${teachersSchema.column("lastname").name} 
        ${ownerColumn}`,
      },
    ],
    where: {
      column: schema.column("id"),
      value: id,
    },
    limit: 1,
  });

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

export { getProgramsWithOwners, getProgram };
