import schema from "../../../db/teachers/schema";

const getSignUpProps = ({}) => {
  const columns = [
    schema.columns.username,
    schema.columns.firstname,
    schema.columns.lastname,
    schema.columns.password,
  ];

  return { columns };
};

export default getSignUpProps;
