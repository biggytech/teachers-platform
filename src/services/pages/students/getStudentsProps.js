import { getStudentsWithTeachers } from "../../../db/students/index";
import schema from "../../../db/students/schema";
import dataTypes from "../../../db/dataTypes";

const getStudentsProps = async ({ page, limit }) => {
  const columns = [
    schema.columns.firstname,
    schema.columns.lastname,
    schema.columns.username,
  ];

  const data = await getStudentsWithTeachers({
    columns,
    page,
    limit,
    teacherColumn: schema.columns.teacher_id.columnName,
  });
  return {
    data: {
      columns: columns.concat({
        name: schema.columns.teacher_id.columnName,
        displayName: schema.columns.teacher_id.displayName,
      }),
      rows: data.rows,
      totalRecords: data.totalRecords,
      pageSize: limit,
      page,
    },
  };
};

export default getStudentsProps;
