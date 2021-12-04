import { ColumnValue } from "@db/Schema";
import schema from "@db/programs/schema";
import teachersSchema from "@db/teachers/schema";
import {
  executeQuery,
  createSimpleInsertQuery,
  createSelectByQuery,
} from "@services/db";
const { pool } = require("@db/index");
const pointsSchema = require("@db/points/schema");

const addProgram = async ({
  columns,
  children,
}: {
  columns: Array<ColumnValue>;
}) => {
  console.log(columns);
  let index = 1;
  let query;
  if (children.length) {
    query = {
      text: `WITH program_ids AS (
          INSERT INTO ${schema.name} (${columns
        .map(({ name }) => name)
        .join(",")})
          values (${columns.map((_, i) => `$${index++}`).join(",")})
          RETURNING ${schema.column("id").name} AS program_id) 
      ${
        children.length
          ? `INSERT INTO ${pointsSchema.name} (${children[0]
              .map(({ name }) => name)
              .concat(pointsSchema.column("program_id").name)
              .join(",")})
      ${children
        .map((point) => {
          return `SELECT ${point
            .map(({ type }, i) =>
              type ? `$${index++}::${type}` : `$${index++}`
            )
            .join(",")}, program_ids.program_id FROM program_ids`;
        })
        .join(" UNION ")};`
          : ";"
      }`,
      values: columns
        .map(({ value }) => value)
        .concat(...children.map((child) => child.map(({ value }) => value))),
    };
  } else {
    query = createSimpleInsertQuery({ schema, columns });
  }

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
