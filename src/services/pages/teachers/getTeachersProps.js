import { getTeachers } from "@db/teachers/index";
import schema from "@db/teachers/schema";

const getTeachersProps = async ({ page, limit }) => {
  const columns = [
    schema.column("firstname").toObject(),
    schema.column("lastname").toObject(),
    schema.column("username").toObject(),
  ];
  console.log(page, limit);

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
