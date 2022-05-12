import schema from "@db/programs/programsSchema";
import programsService from "@db/programs/programsService";

const getAddProgramProps = async ({ ownerId, isEdit = false, id }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("owner_id").withValue(ownerId),
  ];

  let data = null;

  if (isEdit) {
    // @ts-ignore
    data = await programsService.get(id);
  }

  return { columns, id, data };
};

export default getAddProgramProps;
