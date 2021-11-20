import schema from "../../../db/users/schema";

const getLoginProps = ({ isInvalid }) => {
  const columns = [schema.columns.username, schema.columns.password];

  return { columns, isInvalid };
};

export default getLoginProps;
