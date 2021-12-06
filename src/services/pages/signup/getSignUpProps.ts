import schema from "@db/teachers/schema";

const getSignUpProps = ({}) => {
  const columns = [
    schema.column("username").toObject(),
    schema.column("firstname").toObject(),
    schema.column("lastname").toObject(),
    schema.column("password").toObject(),
  ];

  return { columns };
};

export default getSignUpProps;
