import schema from "@db/programs/schema";
import pointsSchema from "@db/points/schema";

const getAddProgramProps = () => {
  const columns = [schema.columns.title, schema.columns.description];

  const steps = [
    pointsSchema.column("title").toObject(),
    pointsSchema.column("description").toObject(),
    pointsSchema.column("duration_days").toObject(),
  ];

  console.log(steps);

  return { columns, steps };
};

export default getAddProgramProps;
