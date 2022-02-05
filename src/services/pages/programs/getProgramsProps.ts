import schema from "@db/programs/programsSchema";
import programsService from "@db/programs/programsService";

const getProgramsProps = async ({ page, limit, ownerId }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];
  const data = await programsService.getAllBy("owner_id", ownerId, page, limit);

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

export default getProgramsProps;
