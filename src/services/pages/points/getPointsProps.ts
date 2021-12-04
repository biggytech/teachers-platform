import { getPointsWithPrograms } from "@db/points/index";
import schema from "@db/points/schema";

const getPointsProps = async ({ program_id }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("duration_days").toObject(),
  ];
  const data = await getPointsWithPrograms({
    programId: program_id,
    columns,
    programColumn: schema.column("program_id").columnName,
  });

  const newColumns = columns.concat({
    name: schema.column("program_id").columnName,
    displayName: schema.column("program_id").displayName,
  });

  return {
    data: {
      columns: newColumns,
      rows: data,
    },
  };
};

export default getPointsProps;
