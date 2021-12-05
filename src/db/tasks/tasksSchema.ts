import DataTypes from "@db/DataTypes";
import Schema, { Column } from "@db/Schema";

const tasksSchema = new Schema({
  name: "tasks",
  columns: [
    new Column({
      name: "title",
      displayName: "Title",
      type: DataTypes.TEXT,
      isRequired: true,
    }),
    new Column({
      name: "description",
      displayName: "Description",
      type: DataTypes.TEXT,
    }),
    new Column({
      name: "point_id",
      displayName: "Point",
      type: DataTypes.MULTIPLE_FOREIGN_KEY,
      isRequired: true,
    }),
  ],
});

export default tasksSchema;
