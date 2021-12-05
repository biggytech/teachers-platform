const createSimpleInsertQuery = ({ schema, columns, returnId = true }) => {
  const query = {
    text: `INSERT INTO "${schema.name}" (${columns
      .map(({ name }) => name)
      .join(",")}) VALUES (${columns.map((_, index) => `$${index + 1}`)}) 
      ${returnId ? `RETURNING ${schema.column("id").name}` : ""}`,
    values: columns.map(({ value }) => value),
  };

  return query;
};

export default createSimpleInsertQuery;
