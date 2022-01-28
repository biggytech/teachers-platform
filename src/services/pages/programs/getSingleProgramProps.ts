import { getProgram } from "@db/programs/programsQueries";
import schema from "@db/programs/programsSchema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";

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
    mapData: mapColumnsToDisplayNames(
      columns.concat(schema.column("owner_id"))
    ),
  };
};

export default getSingleProgramProps;
