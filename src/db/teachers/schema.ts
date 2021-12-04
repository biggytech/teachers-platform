import Schema, { Column } from "@db/Schema";
const DataTypes = require("../dataTypes");

const schema = new Schema({
  name: "teachers",
  columns: [
    new Column({
      name: "firstname",
      isRequired: true,
      displayName: "Firstname",
      type: DataTypes.TEXT,
    }),

    new Column({
      name: "lastname",
      isRequired: true,
      displayName: "Lastname",
      type: DataTypes.TEXT,
    }),

    new Column({
      name: "username",
      isRequired: true,
      displayName: "Username",
      type: DataTypes.TEXT,
      constraints: "UNIQUE",
    }),

    new Column({
      name: "password",
      isRequired: true,
      displayName: "Password",
      type: DataTypes.PASSWORD,
    }),

    new Column({
      name: "picture",
      displayName: "User picture",
      type: DataTypes.BYTEA,
    }),
  ],
});

export default schema;
