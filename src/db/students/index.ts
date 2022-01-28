import teachersSchema from "@db/teachers/schema";
import schema from "@db/students/schema";
import {
  executeQuery,
  createSimpleInsertQuery,
  createPaginatedSelectQuery,
  createLimitedSelectQuery,
} from "@services/db";

const getStudents = async ({ columns, page, limit }) => {
  const offset = (+page - 1) * +limit;

  const query = createPaginatedSelectQuery({ schema, columns, offset, limit });

  const results = await executeQuery(query);

  return {
    rows: results.rows[0]?.rows ?? [],
    totalRecords: results.rows[0]?.total_records ?? 0,
  };
};

const getStudentsWithTeachers = async ({
  columns,
  page,
  limit,
  teacherColumn,
  teacherId,
}) => {
  const offset = (+page - 1) * +limit;
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
    }.${schema.column("teacher_id").name} = ${teachersSchema.name}.${
      teachersSchema.column("id").name
    } AND ${schema.name}.${schema.column("teacher_id").name}=$1
      ORDER BY ${schema.name}.${
      schema.column("id").name
    } ASC OFFSET ${offset} LIMIT ${limit}) 
            AS t
          ) AS rows
        ;
      `,
    values: [teacherId],
  };

  const results = await executeQuery(query);

  return {
    rows: results.rows[0]?.rows ?? [],
    totalRecords: results.rows[0]?.total_records ?? 0,
  };
};

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

const addStudent = async ({ columns }) => {
  const query = createSimpleInsertQuery({ schema, columns });

  await executeQuery(query);
};

module.exports = {
  getStudents,
  getStudentsWithTeachers,
  getStudent,
  addStudent,
  getStudentByUsername,
};
