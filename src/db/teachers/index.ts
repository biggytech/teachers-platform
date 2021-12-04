import schema from "@db/teachers/schema";

const { pool } = require("../index");

const getTeachers = ({ columns, page, limit }) => {
  const offset = (+page - 1) * +limit;

  return new Promise((resolve, reject) => {
    const query = {
      text: `
      SELECT 
        (SELECT COUNT(*) FROM "${schema.name}") as total_records,
          (SELECT json_agg(t.*) FROM (
            SELECT ${columns.map(({ name }) => name).join(",")} FROM "${
        schema.name
      }" ORDER BY ${
        schema.column("id").name
      } ASC OFFSET ${offset} LIMIT ${limit}) 
            AS t
          ) AS rows
        ;
      `,
      values: [],
    };

    console.log();

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

const getTeacher = ({ id, columns }) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: `
      SELECT ${columns.map(({ name }) => name).join(",")} FROM "${
        schema.name
      }" WHERE ${schema.column("id").name}=$1 LIMIT 1;
      `,
      values: [id],
    };

    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results.rows[0] ?? null);
    });
  });
};

const getTeacherByUsername = ({ username, columns }) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: `
      SELECT ${columns.map(({ name }) => name).join(",")} FROM "${
        schema.name
      }" WHERE ${schema.column("username").name}=$1 LIMIT 1;
      `,
      values: [username],
    };

    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results.rows[0] ?? null);
    });
  });
};

const addTeacher = ({ columns }) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: `INSERT INTO "${schema.name}" (${columns
        .map(({ name }) => name)
        .join(",")}) VALUES (${columns.map((_, index) => `$${index + 1}`)})`,
      values: columns.map(({ value }) => value),
    };

    console.log(query);

    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
};

module.exports = {
  getTeachers,
  getTeacher,
  addTeacher,
  getTeacherByUsername,
};
