import { ColumnValue } from "@db/Schema";
import schema from "@db/programs/schema";
import pointsSchema from "@db/points/schema";

const cookCreatedMaterialData = ({ body }) => {
  const columns = [];
  const children = [];

  for (const key in body) {
    columns.push({
      name: key,
      value: body[key],
    });
  }
  return columns;
};

export default cookCreatedMaterialData;
