import DataTypes, { DataType } from "@db/DataTypes";
import Schema, { Column } from "@db/Schema";

const plansSchema = new Schema({
  name: "plans",
  columns: [
    new Column({
      name: "start_date",
      displayName: "Дата начала",
      type: DataTypes.DATE,
      isRequired: true,
    }),
    new Column({
      name: "student_id",
      displayName: "Студент",
      type: DataTypes.FOREIGN_KEY,
      isRequired: true,
    }),
    new Column({
      name: "program_id",
      displayName: "Программа",
      type: DataTypes.FOREIGN_KEY,
      isRequired: true,
    }),
  ],
});

export default plansSchema;
