import DataTypes from "@db/DataTypes";
import Schema, { Column } from "@db/Schema";

export const taskMarksSchema = new Schema({
  name: "task_marks",
  withoutIdentifier: true,
  columns: [
    new Column({
      name: "mark",
      displayName: "Балл",
      isRequired: true,
      type: DataTypes.SMALL_INTEGER,
    }),
    new Column({
      name: "task_id",
      displayName: "Практическое задание",
      isRequired: true,
      type: DataTypes.FOREIGN_KEY,
    }),
    new Column({
      name: "plan_id",
      displayName: "Учебный план",
      isRequired: true,
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});
