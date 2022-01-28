import { createLimitedSelectQuery } from ".";
import { LimitedQuery } from "./createLimitedSelectQuery";

// type SelectByQuery = Exclude<keyof LimitedQuery, "limit">;
// type SelectByQuery = Pick<LimitedQuery, 'schema', 'columns'>;

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
