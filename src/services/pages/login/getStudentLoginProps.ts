import schema from "@db/students/schema";

const getStudentLoginProps = ({ isInvalid }) => {
  const columns = [
    schema.column("username").toObject(),
    schema.column("password").toObject(),
  ];

  return { columns, isInvalid };
};

export default getStudentLoginProps;
