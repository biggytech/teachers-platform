import { getStudent } from "@db/students/index";
import schema from "@db/students/schema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";

const getSingleStudentProps = async ({ id }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("firstname").toObject(),
    schema.column("lastname").toObject(),
    schema.column("username").toObject(),
    schema.column("picture").toObject(),
  ];

  const data = await getStudent({
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

export default getSingleStudentProps;
