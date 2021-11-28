import { getStudent } from "../../../db/students/index";
import schema from "../../../db/students/schema";
import dataTypes from "../../../db/dataTypes";

const getSingleStudentProps = async ({ id }) => {
  const columns = [
    schema.columns.id,
    schema.columns.firstname,
    schema.columns.lastname,
    schema.columns.username,
    schema.columns.password,
    schema.columns.picture,
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
  };
};

export default getSingleStudentProps;
