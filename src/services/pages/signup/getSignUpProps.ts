import schema from "@db/teachers/schema";

const getSignUpProps = ({}) => {
  const columns = [
    schema.column("username").toObject(),
    schema.column("firstname").toObject(),
    schema.column("lastname").toObject(),
    schema.column("password").toObject(),
  ];

  console.log(columns);

  return { columns };
};

export default getSignUpProps;
