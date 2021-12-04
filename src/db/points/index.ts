import schema from "@db/points/schema";
import programsSchema from "@db/programs/schema";

const { pool } = require("@db/index");

const getPointsWithPrograms = ({ programId, columns, programColumn }) => {
  return new Promise((resolve, reject) => {
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

    console.log(query);

    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results.rows);
    });
  });
};

export { getPointsWithPrograms };