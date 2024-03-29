import schema from "@db/materials/materialsSchema";

const getAddMaterialProps = async ({ programId }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("link").toObject(),
    schema.column("program_id").withValue(programId),
  ];

  return {
    columns,
  };
};

export default getAddMaterialProps;
