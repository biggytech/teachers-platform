import schema from "@db/teachers/schema";
import {
  executeQuery,
  createSimpleInsertQuery,
  createPaginatedSelectQuery,
  createLimitedSelectQuery,
} from "@services/db";

const getTeachers = async ({ columns, page, limit }) => {
  const offset = (+page - 1) * +limit;

  const query = createPaginatedSelectQuery({ schema, columns, offset, limit });

  const results = await executeQuery(query);

  return {
    rows: results.rows[0]?.rows ?? [],
    totalRecords: results.rows[0]?.total_records ?? 0,
  };
};

const getTeacher = async ({ id, columns }) => {
  const query = createLimitedSelectQuery({ schema, columns, searchValue: id });

  const results = await executeQuery(query);

  return results.rows[0] ?? null;
};

export const getTeacherByUsername = async ({ username, columns }) => {
  const query = createLimitedSelectQuery({
    schema,
    columns,
    searchValue: username,
    searchColumn: schema.column("username").name,
  });

  const results = await executeQuery(query);

  return results.rows[0] ?? null;
};

const addTeacher = async ({ columns }) => {
  const query = createSimpleInsertQuery({ schema, columns });

  await executeQuery(query);
};

module.exports = {
  getTeachers,
  getTeacher,
  addTeacher,
  getTeacherByUsername,
};
