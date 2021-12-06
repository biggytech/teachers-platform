import Schema, { Column } from "@db/Schema";
import DataTypes from "@db/DataTypes";

const schema = new Schema({
  name: "teachers",
  columns: [
    new Column({
      name: "firstname",
      isRequired: true,
      displayName: "Имя",
      type: DataTypes.TEXT,
    }),

    new Column({
      name: "lastname",
      isRequired: true,
      displayName: "Фамилия",
      type: DataTypes.TEXT,
    }),

    new Column({
      name: "username",
      isRequired: true,
      displayName: "Логин",
      type: DataTypes.TEXT,
      constraints: "UNIQUE",
    }),

    new Column({
      name: "password",
      isRequired: true,
      displayName: "Пароль",
      type: DataTypes.PASSWORD,
    }),

    new Column({
      name: "picture",
      displayName: "Изображение",
      type: DataTypes.BYTEA,
    }),
  ],
});

export default schema;
