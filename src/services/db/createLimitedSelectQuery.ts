const createLimitedSelectQuery = ({
  schema,
  columns,
  searchColumn = schema.column("id").name,
  searchValue,
  limit = 1,
}) => {
  const query = {
    text: `
          SELECT ${columns.map(({ name }) => name).join(",")} FROM "${
      schema.name
    }" WHERE ${searchColumn}=$1${limit ? ` LIMIT ${limit}` : ""};
          `,
    values: [searchValue],
  };

  return query;
};

export default createLimitedSelectQuery;
