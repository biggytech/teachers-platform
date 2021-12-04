import { getProgramsWithOwners } from "@db/programs/index";
import schema from "@db/programs/schema";

const getProgramsProps = async ({ page, limit }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];
  const data = await getProgramsWithOwners({
    columns,
    page,
    limit,
    ownerColumn: schema.column("owner_id").columnName,
  });
  console.log(data);

  const newColumns = columns.concat({
    name: schema.column("owner_id").columnName,
    displayName: schema.column("owner_id").displayName,
  });
  console.log(newColumns);

  return {
    data: {
      columns: newColumns,
      rows: data.rows,
      totalRecords: data.totalRecords,
      pageSize: limit,
      page,
    },
  };
};

export default getProgramsProps;
