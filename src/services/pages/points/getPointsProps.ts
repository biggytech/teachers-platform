import pointsService from "@db/points/pointsService";
import schema from "@db/points/schema";

const getPointsProps = async ({ program_id }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("duration_days").toObject(),
  ];
  const data = await pointsService.getAllBy('program_id', program_id);

  const newColumns = columns.concat({
    name: schema.column("program_id").columnName,
    displayName: schema.column("program_id").displayName,
  });

  return {
    data: {
      columns: newColumns,
      rows: data.map(item => ({...item, program_id: item.program.title})),
    },
    programId: program_id,
  };
};

export default getPointsProps;
