import schema from "@db/students/schema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";
import studentsService from "@db/students/studentsService";

const getSingleStudentProps = async ({ id }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("firstname").toObject(),
    schema.column("lastname").toObject(),
    schema.column("username").toObject(),
    schema.column("picture").toObject(),
  ];

  const data = await studentsService.get(id);

  return {
    data: {
      ...data,
      picture: data?.picture
        ? Buffer.from(data.picture).toString("base64")
        : null,
    },
    id,
    mapData: mapColumnsToDisplayNames(
      columns.filter(({ name }) => name !== "picture")
    ),
  };
};

export default getSingleStudentProps;
