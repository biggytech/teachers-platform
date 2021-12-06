import { getTeachers } from "@db/teachers/index";
import schema from "@db/teachers/schema";

const getTeachersProps = async ({ page, limit }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("firstname").toObject(),
    schema.column("lastname").toObject(),
    schema.column("username").toObject(),
  ];

  const data = await getTeachers({
    columns,
    page,
    limit,
  });
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

export default getTeachersProps;