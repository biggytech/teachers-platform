import { getTeachers } from "../../../db/teachers/index";
import schema from "../../../db/teachers/schema";
import dataTypes from "../../../db/dataTypes";

const getTeachersProps = async ({ page, limit }) => {
  const columns = [
    schema.columns.firstname,
    schema.columns.lastname,
    schema.columns.username,
  ];

  const data = await getTeachers({
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

export default getTeachersProps;
