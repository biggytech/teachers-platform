import Schema, { SchemaDefinition, Column, ColumnDefinition } from "@db/Schema";
import DataTypes from "@db/DataTypes";

const schema = new Schema({
  name: "points",
  columns: [
    new Column({
      name: "title",
      isRequired: true,
      displayName: "Название",
      type: DataTypes.TEXT,
    }),

    new Column({
      name: "description",
      displayName: "Описание",
      type: DataTypes.TEXT,
    }),

    new Column({
      name: "duration_days",
      displayName: "Продолжительность (дней)",
      type: DataTypes.INTEGER,
    }),

    new Column({
      name: "program_id",
      displayName: "Программа",
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

module.exports = schema;
