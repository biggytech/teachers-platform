import schema from "@db/teachers/schema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";
import teachersService from "@db/teachers/teachersService";

const getSingleTeacherProps = async ({ id }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("firstname").toObject(),
    schema.column("lastname").toObject(),
    schema.column("username").toObject(),
    schema.column("picture").toObject(),
  ];

  const data = await teachersService.get(id);

  return {
    data: {
      ...data,
      picture: data.picture
        ? Buffer.from(data.picture).toString("base64")
        : null,
    },
    id,
    mapData: mapColumnsToDisplayNames(
      columns.filter(({ name }) => name !== "picture")
    ),
  };
};

export default getSingleTeacherProps;
