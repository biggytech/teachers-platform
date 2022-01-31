import schema from "@db/students/schema";
import { executeQuery, createLimitedSelectQuery } from "@services/db";

const getStudent = async ({ id, columns }) => {
  const query = createLimitedSelectQuery({ schema, columns, searchValue: id });

  const results = await executeQuery(query);

  return results.rows[0] ?? null;
};

export const getStudentByUsername = async ({ username, columns }) => {
  const query = createLimitedSelectQuery({
    schema,
    columns,
    searchValue: username,
    searchColumn: schema.column("username").name,
  });

  const results = await executeQuery(query);

  return results.rows[0] ?? null;
};

module.exports = {
  getStudent,
  getStudentByUsername,
};
