import schema from "@db/points/schema";
import pointsService from "@db/points/pointsService";

const getAddPointProps = async ({ programId, id, isEdit = false }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("duration_days").toObject(),
    schema.column("program_id").withValue(programId),
  ];

  let data = null;

  if (isEdit) {
    data = await pointsService.get(id);
  }

  return {
    columns,
    id,
    data,
  };
};

export default getAddPointProps;
