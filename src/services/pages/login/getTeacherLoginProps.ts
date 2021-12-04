import schema from "@db/teachers/schema";

const getTeacherLoginProps = ({ isInvalid }) => {
  const columns = [
    schema.column("username").toObject(),
    schema.column("password").toObject(),
  ];

  return { columns, isInvalid };
};

export default getTeacherLoginProps;
