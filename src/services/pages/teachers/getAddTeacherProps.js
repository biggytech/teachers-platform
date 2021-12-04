import schema from "@db/teachers/schema";

const getAddTeacherProps = async () => {
  const columns = [
    schema.column("firstname").toObject(),
    schema.column("lastname").toObject(),
    schema.column("username").toObject(),
    schema.column("password").toObject(),
    schema.column("picture").toObject(),
  ];

  return {
    columns,
  };
};

export default getAddTeacherProps;
