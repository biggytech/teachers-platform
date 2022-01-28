import { getMaterialsWithPrograms } from "@db/materials/index";
import schema from "@db/materials/materialsSchema";

const getMaterialsProps = async ({ program_id }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("link").toObject(),
  ];
  const data = await getMaterialsWithPrograms({
    programId: program_id,
    columns,
    programColumn: schema.column("program_id").columnName,
  });

  const newColumns = columns.concat({
    name: schema.column("program_id").columnName,
    displayName: schema.column("program_id").displayName,
  });

  return {
    data: {
      columns: newColumns,
      rows: data,
    },
    programId: program_id,
  };
};

export default getMaterialsProps;
