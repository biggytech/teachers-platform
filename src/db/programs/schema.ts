import Schema, { Column } from "@db/Schema";

const DataTypes = require("../dataTypes");

const schema = new Schema({
  name: "programs",
  columns: new Map<string, Column>([
    [
      "id",
      new Column({
        name: "id",
        displayName: "Id",
        type: DataTypes.INTEGER,
        isRequired: true,
        constraints: "SERIAL PRIMARY KEY",
      }),
    ],
    [
      "title",
      new Column({
        name: "title",
        isRequired: true,
        displayName: "Title",
        type: DataTypes.TEXT,
      }),
    ],
    [
      "description",
      new Column({
        name: "description",
        displayName: "Description",
        type: DataTypes.TEXT,
      }),
    ],
    [
      "owner_id",
      new Column({
        name: "owner_id",
        columnName: "owner",
        displayName: "Owner",
        type: DataTypes.FOREIGN_KEY,
      }),
    ],
  ]),
});

export default schema;
