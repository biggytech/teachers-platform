import schema from "@db/programs/programsSchema";

const getAddProgramProps = ({ ownerId }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("owner_id").withValue(ownerId),
  ];

  return { columns };
};

export default getAddProgramProps;
