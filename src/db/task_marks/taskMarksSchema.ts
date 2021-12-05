import DataTypes from "@db/DataTypes";
import Schema, { Column } from "@db/Schema";

export const taskMarksSchema = new Schema({
  name: "task_marks",
  withoutIdentifier: true,
  columns: [
    new Column({
      name: "mark",
      displayName: "Mark",
      isRequired: true,
      type: DataTypes.SMALL_INTEGER,
    }),
    new Column({
      name: "task_id",
      displayName: "Task",
      isRequired: true,
      type: DataTypes.FOREIGN_KEY,
    }),
    new Column({
      name: "plan_id",
      displayName: "Plan",
      isRequired: true,
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});
