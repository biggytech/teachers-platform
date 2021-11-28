import { getStudents } from "../../../db/students/index";
import schema from "../../../db/students/schema";
import dataTypes from "../../../db/dataTypes";

const getStudentsProps = async ({ page, limit }) => {
  const columns = [
    schema.columns.id,
    schema.columns.firstname,
    schema.columns.lastname,
    schema.columns.username,
    schema.columns.password,
  ];

  const data = await getStudents({
    columns,
    page,
    limit,
  });
  return {
    data: {
      columns,
      rows: data.rows,
      totalRecords: data.totalRecords,
      pageSize: limit,
      page,
    },
  };
};

export default getStudentsProps;
