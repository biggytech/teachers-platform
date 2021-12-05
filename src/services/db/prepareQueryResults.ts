export const prepareQueryResults = (results) => {
  return {
    ...results,
    rows: results.rows.map((row) => {
      if (row instanceof Object) {
        const prepared = {};
        for (const key in row) {
          if (row[key] instanceof Date) {
            prepared[key] = row[key].toDateString();
          } else {
            prepared[key] = row[key];
          }
        }
        return prepared;
      } else {
        return row;
      }
    }),
  };
};
