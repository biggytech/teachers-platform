const createPaginatedSelectQuery = ({ schema, columns, offset, limit }) => {
  const query = {
    text: `
          SELECT 
            (SELECT COUNT(*) FROM "${schema.name}") as total_records,
              (SELECT json_agg(t.*) FROM (
                SELECT ${columns.map(({ name }) => name).join(",")} FROM "${
      schema.name
    }" ORDER BY ${
      schema.column("id").name
    } ASC OFFSET ${offset} LIMIT ${limit}) 
                AS t
              ) AS rows
            ;
          `,
    values: [],
  };
  return query;
};

export default createPaginatedSelectQuery;
