import { getUsers } from "../../../db/users/index";
import schema from "../../../db/users/schema";
import dataTypes from "../../../db/dataTypes";

const getStudentsProps = async ({ page, limit }) => {
  const columns = [
    schema.columns.id,
    schema.columns.role,
    schema.columns.firstname,
    schema.columns.lastname,
    schema.columns.username,
    schema.columns.password,
  ];

  const data = await getUsers({
    columns,
    role: dataTypes.role.data.student,
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
