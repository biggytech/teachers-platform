import schema from "../../../db/users/schema";

const getAddTeacherProps = async () => {
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

export default getAddTeacherProps;
