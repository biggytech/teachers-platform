import schema from "@db/students/schema";
import studentsService from "@db/students/studentsService";

const getStudentsProps = async ({ page, limit, teacherId }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("firstname").toObject(),
    schema.column("lastname").toObject(),
    schema.column("username").toObject(),
  ];

  const data = await studentsService.getAllBy(
    "teacher_id",
    teacherId,
    page,
    limit
  );

  return {
    data: {
      columns,
      rows: data.rows,
      totalRecords: data.totalRecords,
      pageSize: limit,
      page,
    },
  };
};

export default getStudentsProps;
