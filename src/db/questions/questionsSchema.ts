import DataTypes from "@db/DataTypes";
import Schema, { Column } from "@db/Schema";

const questionsSchema = new Schema({
  name: "questions",
  columns: [
    new Column({
      name: "description",
      displayName: "Описание",
      isRequired: true,
      type: DataTypes.TEXT,
    }),
    new Column({
      name: "test_id",
      displayName: "Тест",
      isRequired: true,
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

export default questionsSchema;
