import Schema, { Column } from "@db/Schema";
import DataTypes from "@db/DataTypes";

const schema = new Schema({
  name: "materials",
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
      name: "link",
      displayName: "Link",
      type: DataTypes.URL,
    }),

    new Column({
      name: "program_id",
      displayName: "Program",
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

export default schema;
