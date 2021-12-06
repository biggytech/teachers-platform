import { getTeacher } from "@db/teachers/index";
import schema from "@db/teachers/schema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";

const getSingleTeacherProps = async ({ id }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("firstname").toObject(),
    schema.column("lastname").toObject(),
    schema.column("username").toObject(),
    schema.column("picture").toObject(),
  ];

  const data = await getTeacher({
    id,
    columns,
  });
  if (data.picture) {
    data.picture = Buffer.from(data.picture).toString("base64");
  }
  return {
    data,
    id,
    mapData: mapColumnsToDisplayNames(
      columns.filter(({ name }) => name !== "picture")
    ),
  };
};

export default getSingleTeacherProps;