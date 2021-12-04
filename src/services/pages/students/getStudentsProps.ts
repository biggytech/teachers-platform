import { getStudentsWithTeachers } from "@db/students/index";
import schema from "@db/students/schema";

const getStudentsProps = async ({ page, limit, teacherId }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("firstname").toObject(),
    schema.column("lastname").toObject(),
    schema.column("username").toObject(),
  ];

  const data = await getStudentsWithTeachers({
    columns,
    page,
    limit,
    teacherColumn: schema.column("teacher_id").columnName,
    teacherId,
  });
  return {
    data: {
      columns: columns.concat({
        name: schema.column("teacher_id").columnName,
        displayName: schema.column("teacher_id").displayName,
      }),
      rows: data.rows,
      totalRecords: data.totalRecords,
      pageSize: limit,
      page,
    },
  };
};

export default getStudentsProps;
