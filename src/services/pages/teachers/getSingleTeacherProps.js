import { getTeacher } from "../../../db/teachers/index";
import schema from "../../../db/teachers/schema";
import dataTypes from "../../../db/dataTypes";

const getSingleTeacherProps = async ({ id }) => {
  const columns = [
    schema.columns.id,
    schema.columns.firstname,
    schema.columns.lastname,
    schema.columns.username,
    schema.columns.password,
    schema.columns.picture,
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
  };
};

export default getSingleTeacherProps;
