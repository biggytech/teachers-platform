import Schema, { SchemaDefinition, Column, ColumnDefinition } from "@db/Schema";

const DataTypes = require("../dataTypes");

const schema = new Schema({
  name: "points",
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
      "duration_days",
      new Column({
        name: "duration_days",
        displayName: "Duration (days)",
        type: DataTypes.INTEGER,
      }),
    ],
    [
      "program_id",
      new Column({
        name: "program_id",
        columnName: "program",
        displayName: "Program",
        type: DataTypes.FOREIGN_KEY,
      }),
    ],
  ]),
});

module.exports = schema;
