import schema from "@db/programs/schema";
// import pointsSchema from "@db/points/schema";

const getAddProgramProps = ({ ownerId }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("owner_id").withValue(ownerId),
  ];

  // const steps = [
  //   pointsSchema.column("title").toObject(),
  //   pointsSchema.column("description").toObject(),
  //   pointsSchema.column("duration_days").toObject(),
  // ];

  return { columns };
};

export default getAddProgramProps;
