import DataTypes from "@db/DataTypes";
import Schema, { Column } from "@db/Schema";

const questionsSchema = new Schema({
  name: "questions",
  columns: [
    new Column({
      name: "description",
      displayName: "Description",
      isRequired: true,
      type: DataTypes.TEXT,
    }),
    new Column({
      name: "test_id",
      displayName: "Test",
      isRequired: true,
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

export default questionsSchema;
