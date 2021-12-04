import Schema, { SchemaDefinition, Column, ColumnDefinition } from "@db/Schema";

const DataTypes = require("../dataTypes");

const schema = new Schema({
  name: "points",
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
      name: "duration_days",
      displayName: "Duration (days)",
      type: DataTypes.INTEGER,
    }),

    new Column({
      name: "program_id",
      columnName: "program",
      displayName: "Program",
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

module.exports = schema;
