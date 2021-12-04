import Schema, { Column } from "@db/Schema";
import DataTypes from "@db/dataTypes";

const schema = new Schema({
  name: "programs",
  columns: [
    new Column({
      name: "title",
      isRequired: true,
      displayName: "Title",
      type: DataTypes.TEXT,
    }),

    new Column({
      name: "description",
      displayName: "Description",
      type: DataTypes.TEXT,
    }),

    new Column({
      name: "owner_id",
      columnName: "owner",
      displayName: "Owner",
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

export default schema;
