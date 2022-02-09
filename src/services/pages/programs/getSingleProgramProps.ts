import schema from "@db/programs/programsSchema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";
import programsService from "@db/programs/programsService";

const getSingleProgramProps = async ({ id }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];

  const data = await programsService.get(id);

  return {
    data: {
      ...data,
      owner: data ? data.teacher.firstname + " " + data.teacher.lastname : null,
    },
    id,
    mapData: mapColumnsToDisplayNames(
      columns.concat({
        name: "owner",
        displayName: schema.column("owner_id").displayName,
      })
    ),
  };
};

export default getSingleProgramProps;
