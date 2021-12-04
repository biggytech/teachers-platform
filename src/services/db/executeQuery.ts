const { pool } = require("@db/index");

type QueryType = string | { text: string; values: Array<any> };

type QueryResult = {
  rows: Array<any>;
};

const executeQuery = (query: QueryType): Promise<QueryResult> => {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  });
};

export default executeQuery;
