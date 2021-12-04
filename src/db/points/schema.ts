import Schema, { SchemaDefinition, Column, ColumnDefinition } from "@db/Schema";

const dataTypes = require("../dataTypes");

const definition = new Schema({
  name: "points",
  columns: new Map<string, Column>([
    [
      "id",
      new Column({
        name: "id",
        displayName: "Id",
        type: dataTypes.integer,
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
        type: dataTypes.text,
      }),
    ],
    [
      "description",
      new Column({
        name: "description",
        displayName: "Description",
        type: dataTypes.text,
      }),
    ],
    [
      "duration_days",
      new Column({
        name: "duration_days",
        displayName: "Duration (days)",
        type: dataTypes.integer,
      }),
    ],
    [
      "program_id",
      new Column({
        name: "program_id",
        columnName: "program",
        displayName: "Program",
        type: dataTypes.foreignKey,
      }),
    ],
  ]),
});

const schema = new Schema(definition);

module.exports = schema;
