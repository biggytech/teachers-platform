import schema from "@db/programs/programsSchema";

const getAddProgramProps = ({ ownerId, isEdit = false, id }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("owner_id").withValue(ownerId),
  ];

  // if (isEdit) {
  //   columns.push(schema.column("id").withValue(id));
  // }

  return { columns, id };
};

export default getAddProgramProps;
