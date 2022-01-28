import { prepareQueryResults } from "./prepareQueryResults";

const { pool } = require("@db/index");

export type SimpleQuery = string;
export type ValuesQuery = { text: string; values: Array<any> };

type QueryResult = {
  rows: Array<any>;
};

const executeQuery = <T extends ValuesQuery = ValuesQuery>(
  query: T
): Promise<QueryResult> => {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(prepareQueryResults(results));
    });
  });
};

export default executeQuery;
