import { getProgramsWithOwners } from "@db/programs/programsQueries";
import schema from "@db/programs/programsSchema";

const getProgramsProps = async ({ page, limit, ownerId }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];
  const data = await getProgramsWithOwners({
    columns,
    page,
    limit,
    ownerColumn: schema.column("owner_id").columnName,
    ownerId,
  });

  const newColumns = columns.concat({
    name: schema.column("owner_id").columnName,
    displayName: schema.column("owner_id").displayName,
  });

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
