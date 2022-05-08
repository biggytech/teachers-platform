import materialsService from "@db/materials/materialsService";
import schema from "@db/materials/materialsSchema";

const getMaterialsProps = async ({ program_id }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("link").toObject(),
  ];
  const data = await materialsService.getAllBy('program_id', program_id);

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

export default getMaterialsProps;
