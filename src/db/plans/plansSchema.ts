import DataTypes, { DataType } from "@db/dataTypes";
import Schema, { Column } from "@db/Schema";

const plansSchema = new Schema({
  name: "plans",
  columns: [
    new Column({
      name: "start_date",
      displayName: "Start date",
      type: DataTypes.DATE,
      isRequired: true,
    }),
    new Column({
      name: "student_id",
      displayName: "Student",
      type: DataTypes.FOREIGN_KEY,
      isRequired: true,
      columnName: "student",
    }),
    new Column({
      name: "program_id",
      displayName: "Program",
      type: DataTypes.FOREIGN_KEY,
      isRequired: true,
      columnName: "program",
    }),
  ],
});

export default plansSchema;
