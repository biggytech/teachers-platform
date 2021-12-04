import { createLimitedSelectQuery } from ".";

const createSelectByQuery = ({
  schema,
  columns,
  searchValue,
  searchColumn,
}) => {
  return createLimitedSelectQuery({
    schema,
    columns,
    searchValue,
    searchColumn,
    limit: null,
  });
};

export default createSelectByQuery;
