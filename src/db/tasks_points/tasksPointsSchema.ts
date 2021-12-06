import DataTypes from "@db/DataTypes";
import Schema, { Column } from "@db/Schema";

const tasksPointsSchema = new Schema({
  name: "tasks_points",
  withoutIdentifier: true,
  columns: [
    new Column({
      name: "task_id",
      displayName: "Практическое задание",
      isRequired: true,
      type: DataTypes.FOREIGN_KEY,
    }),
    new Column({
      name: "point_id",
      displayName: "Пункт программы",
      isRequired: true,
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

export default tasksPointsSchema;
