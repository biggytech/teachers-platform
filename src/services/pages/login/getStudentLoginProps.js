import schema from "../../../db/students/schema";

const getStudentLoginProps = ({ isInvalid }) => {
  const columns = [schema.columns.username, schema.columns.password];

  return { columns, isInvalid };
};

export default getStudentLoginProps;
