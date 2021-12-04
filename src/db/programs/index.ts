import { ColumnValue } from "@db/Schema";
import schema from "@db/programs/schema";
import teachersSchema from "@db/teachers/schema";

const { pool } = require("@db/index");
const pointsSchema = require("@db/points/schema");

const addProgram = ({ columns, children }: { columns: Array<ColumnValue> }) => {
  return new Promise((resolve, reject) => {
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
      query = {
        text: `
          INSERT INTO ${schema.name} (${columns
          .map(({ name }) => name)
          .join(",")})
          values (${columns.map((_, i) => `$${index++}`).join(",")});
      `,
        values: columns.map(({ value }) => value),
      };
    }

    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
};

const getProgramsWithOwners = ({ columns, page, limit, ownerColumn }) => {
  const offset = (+page - 1) * +limit;
  console.log(schema);
  return new Promise((resolve, reject) => {
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
      } 
      ORDER BY ${schema.name}.${
        schema.column("id").name
      } ASC OFFSET ${offset} LIMIT ${limit}) 
            AS t
          ) AS rows
        ;
      `,
      values: [],
    };

    console.log(query);

    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve({
        rows: results.rows[0]?.rows ?? [],
        totalRecords: results.rows[0]?.total_records ?? 0,
      });
    });
  });
};

const getProgram = ({ id, columns, ownerColumn }) => {
  return new Promise((resolve, reject) => {
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

    console.log(query);

    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results.rows[0] ?? null);
    });
  });
};

export { addProgram, getProgramsWithOwners, getProgram };
