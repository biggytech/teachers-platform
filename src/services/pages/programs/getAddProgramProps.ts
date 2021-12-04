import schema from "@db/programs/schema";
import pointsSchema from "@db/points/schema";

const getAddProgramProps = () => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];

  const steps = [
    pointsSchema.column("title").toObject(),
    pointsSchema.column("description").toObject(),
    pointsSchema.column("duration_days").toObject(),
  ];

  return { columns, steps };
};

export default getAddProgramProps;
