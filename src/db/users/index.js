const { pool } = require("../index");
const schema = require("../../db/users/schema");

const getUsers = ({ columns, role, page, limit }) => {
  const offset = (+page - 1) * +limit;

  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
      (SELECT COUNT(*) FROM "${
        schema.name
      }" WHERE role='${role}') as total_records,
        (SELECT json_agg(t.*) FROM (
          SELECT ${columns.map(({ name }) => name).join(",")} FROM "${
      schema.name
    }" WHERE role='${role}' ORDER BY id ASC OFFSET ${offset} LIMIT ${limit}) 
          AS t
        ) AS rows
      ;
    `;

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

const getUser = ({ id, columns, role }) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT ${columns.map(({ name }) => name).join(",")} FROM "${
      schema.name
    }" WHERE role='${role}' AND id=${id} LIMIT 1;
    `;

    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results.rows[0] ?? null);
    });
  });
};

const addUser = ({ columns, role }) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: `INSERT INTO "${schema.name}" (${columns
        .map(({ name }) => name)
        .concat("role")
        .join(",")}) VALUES (${columns
        .concat("role")
        .map((_, index) => `$${index + 1}`)})`,
      values: columns.map(({ value }) => value).concat(role),
    };

    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
};

module.exports = {
  getUsers,
  getUser,
  addUser,
};
