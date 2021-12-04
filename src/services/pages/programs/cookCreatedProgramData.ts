import { ColumnValue } from "@db/Schema";
import schema from "@db/programs/schema";
import pointsSchema from "@db/points/schema";

const cookCreatedProgramData = ({
  program,
  points,
  userId,
}): { columns: Array<ColumnValue>; children: Array<Array<ColumnValue>> } => {
  const columns = [];
  const children = [];

  for (const key in program) {
    columns.push({
      name: key,
      value: program[key],
    });
  }
  columns.push({
    name: schema.column("owner_id").name,
    value: userId,
  });

  points.forEach((point) => {
    const cols = [];
    for (const key in point) {
      cols.push({
        name: key,
        value: point[key],
        type:
          key === pointsSchema.column("duration_days").name
            ? pointsSchema.column("duration_days").type.dataType
            : undefined,
      });
    }
    children.push(cols);
  });

  return { columns, children };
};

export default cookCreatedProgramData;
