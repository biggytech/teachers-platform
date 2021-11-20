import { getUser } from "../../../db/users/index";
import schema from "../../../db/users/schema";
import dataTypes from "../../../db/dataTypes";

const getSingleStudentProps = async ({ id }) => {
  const columns = [
    schema.columns.id,
    schema.columns.role,
    schema.columns.firstname,
    schema.columns.lastname,
    schema.columns.username,
    schema.columns.password,
    schema.columns.picture,
  ];

  const data = await getUser({
    id,
    columns,
    role: dataTypes.role.data.student,
  });
  if (data.picture) {
    data.picture = Buffer.from(data.picture).toString("base64");
  }
  return {
    data,
  };
};

export default getSingleStudentProps;
