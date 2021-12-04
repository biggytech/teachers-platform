import { getProgram } from "@db/programs/index";
import schema from "@db/programs/schema";

const getSingleProgramProps = async ({ id }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];

  const data = await getProgram({
    id,
    columns,
    ownerColumn: schema.column("owner_id").columnName,
  });
  return {
    data,
    id,
  };
};

export default getSingleProgramProps;
