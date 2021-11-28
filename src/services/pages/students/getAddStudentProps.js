import schema from "../../../db/students/schema";

const getAddStudentProps = async () => {
  const columns = [
    schema.columns.firstname,
    schema.columns.lastname,
    schema.columns.username,
    schema.columns.password,
    schema.columns.picture,
  ];

  return {
    columns,
  };
};

export default getAddStudentProps;
