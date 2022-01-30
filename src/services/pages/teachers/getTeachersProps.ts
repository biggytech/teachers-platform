import schema from "@db/teachers/schema";
import teachersService from "@db/teachers/teachersService";

const getTeachersProps = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("firstname").toObject(),
    schema.column("lastname").toObject(),
    schema.column("username").toObject(),
  ];

  const data = await teachersService.getAll(page, limit);

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
