import Schema, { Column } from "@db/Schema";
import DataTypes from "@db/DataTypes";

const schema = new Schema({
  name: "materials",
  columns: [
    new Column({
      name: "title",
      displayName: "Название",
      type: DataTypes.TEXT,
      isRequired: true,
    }),

    new Column({
      name: "description",
      displayName: "Описание",
      type: DataTypes.TEXT,
    }),

    new Column({
      name: "link",
      displayName: "Ссылка",
      type: DataTypes.URL,
    }),

    new Column({
      name: "program_id",
      displayName: "Программа",
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

export default schema;
