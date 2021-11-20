const { pool } = require("../index");
const schema = require("../../db/users/schema");

const getUsers = ({ columns, role, page, limit }) => {
  const offset = (+page - 1) * +limit;

  return new Promise((resolve, reject) => {
    const query = {
      text: `
      SELECT 
        (SELECT COUNT(*) FROM "${schema.name}" WHERE ${
        schema.columns.role.name
      }=$1) as total_records,
          (SELECT json_agg(t.*) FROM (
            SELECT ${columns.map(({ name }) => name).join(",")} FROM "${
        schema.name
      }" WHERE ${schema.columns.role.name}=$1 ORDER BY ${
        schema.columns.id.name
      } ASC OFFSET ${offset} LIMIT ${limit}) 
            AS t
          ) AS rows
        ;
      `,
      values: [role],
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

const getUser = ({ id, columns, role }) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: `
      SELECT ${columns.map(({ name }) => name).join(",")} FROM "${
        schema.name
      }" WHERE ${schema.columns.role.name}=$1 AND ${
        schema.columns.id.name
      }=$2 LIMIT 1;
      `,
      values: [role, id],
    };

    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results.rows[0] ?? null);
    });
  });
};

const getUserByUsername = ({ username, columns, role }) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: `
      SELECT ${columns.map(({ name }) => name).join(",")} FROM "${
        schema.name
      }" WHERE ${schema.columns.role.name}=$1 AND ${
        schema.columns.username.name
      }=$2 LIMIT 1;
      `,
      values: [role, username],
    };

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
        .concat(schema.columns.role.name)
        .join(",")}) VALUES (${columns
        .concat(schema.columns.role.name)
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
  getUserByUsername,
};
