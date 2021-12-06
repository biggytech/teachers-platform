import Schema, { Column } from "@db/Schema";
import DataTypes from "@db/DataTypes";

const schema = new Schema({
  name: "programs",
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
      name: "owner_id",
      displayName: "Владелец",
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

export default schema;
