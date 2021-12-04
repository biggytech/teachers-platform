const createSimpleInsertQuery = ({ schema, columns }) => {
  const query = {
    text: `INSERT INTO "${schema.name}" (${columns
      .map(({ name }) => name)
      .join(",")}) VALUES (${columns.map((_, index) => `$${index + 1}`)})`,
    values: columns.map(({ value }) => value),
  };

  return query;
};

export default createSimpleInsertQuery;
