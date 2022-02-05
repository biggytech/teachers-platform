import schema from "@db/programs/programsSchema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";
import programsService from "@db/programs/programsService";

const getSingleProgramProps = async ({ id }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];

  const data = await programsService.getWithTeacher(id);

  return {
    data: {
      ...data,
      // TODO: fix joined data mapped fields
      owner_id: data
        ? data.teacher.firstname + " " + data.teacher.lastname
        : null,
    },
    id,
    mapData: mapColumnsToDisplayNames(
      columns.concat(schema.column("owner_id"))
    ),
  };
};

export default getSingleProgramProps;
