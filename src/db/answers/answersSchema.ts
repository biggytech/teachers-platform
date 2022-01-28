import DataTypes from "@db/DataTypes";
import Schema, { Column } from "@db/Schema";
import { DisplayNames } from "@services/DisplayNames";

const answersSchema = new Schema({
  name: "answers",
  columns: [
    new Column({
      name: "description",
      displayName: DisplayNames.description,
      isRequired: true,
      type: DataTypes.TEXT,
    }),
    new Column({
      name: "is_correct",
      displayName: DisplayNames.is_correct,
      isRequired: true,
      type: DataTypes.BOOLEAN,
    }),
    new Column({
      name: "question_id",
      displayName: DisplayNames.question_id,
      isRequired: true,
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

export default answersSchema;
