import schema from "../../../db/teachers/schema";

const getTeacherLoginProps = ({ isInvalid }) => {
  const columns = [schema.columns.username, schema.columns.password];

  return { columns, isInvalid };
};

export default getTeacherLoginProps;
