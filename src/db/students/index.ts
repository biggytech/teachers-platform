import teachersSchema from "@db/teachers/schema";
const { pool } = require("../index");
const schema = require("../../db/students/schema");

const getStudents = ({ columns, page, limit }) => {
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
        schema.columns.id.name
      } ASC OFFSET ${offset} LIMIT ${limit}) 
            AS t
          ) AS rows
        ;
      `,
      values: [],
    };

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

const getStudentsWithTeachers = ({ columns, page, limit, teacherColumn }) => {
  const offset = (+page - 1) * +limit;
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
      } ${teacherColumn} 
            FROM "${schema.name}" INNER JOIN ${teachersSchema.name} ON ${
        schema.name
      }.${schema.columns.teacher_id.name} = ${teachersSchema.name}.${
        teachersSchema.column("id").name
      } 
      ORDER BY ${schema.name}.${
        schema.columns.id.name
      } ASC OFFSET ${offset} LIMIT ${limit}) 
            AS t
          ) AS rows
        ;
      `,
      values: [],
    };

    console.log(query.text);

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

const getStudent = ({ id, columns }) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: `
      SELECT ${columns.map(({ name }) => name).join(",")} FROM "${
        schema.name
      }" WHERE ${schema.columns.id.name}=$1 LIMIT 1;
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

const getStudentByUsername = ({ username, columns }) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: `
      SELECT ${columns.map(({ name }) => name).join(",")} FROM "${
        schema.name
      }" WHERE ${schema.columns.username.name}=$1 LIMIT 1;
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

const addStudent = ({ columns }) => {
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
  getStudents,
  getStudentsWithTeachers,
  getStudent,
  addStudent,
  getStudentByUsername,
};
