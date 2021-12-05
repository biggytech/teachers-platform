import DataTypes from "@db/DataTypes";
import Schema, { Column } from "@db/Schema";

const answersSchema = new Schema({
  name: "answers",
  columns: [
    new Column({
      name: "description",
      displayName: "Description",
      isRequired: true,
      type: DataTypes.TEXT,
    }),
    new Column({
      name: "is_correct",
      displayName: "Is Correct",
      isRequired: true,
      type: DataTypes.BOOLEAN,
    }),
    new Column({
      name: "question_id",
      displayName: "Question",
      isRequired: true,
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

export default answersSchema;
