import schema from "@db/points/schema";

const getAddPointProps = async ({ programId, id }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("duration_days").toObject(),
    schema.column("program_id").withValue(programId),
  ];

  return {
    columns,
    id,
  };
};

export default getAddPointProps;
