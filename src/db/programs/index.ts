import { ColumnValue } from "@db/Schema";

const { pool } = require("@db/index");
const schema = require("@db/programs/schema");
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
          RETURNING ${schema.columns.id.name} AS program_id) 
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

    console.log(query);

    //   const query = {
    //     text: `INSERT INTO "${schema.name}" (${columns
    //       .map(({ name }) => name)
    //       .join(",")}) VALUES (${columns.map((_, index) => `$${index + 1}`)})`,
    //     values: columns.map(({ value }) => value),
    //   };
    //   console.log(query);
    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
};

module.exports = {
  addProgram,
};
