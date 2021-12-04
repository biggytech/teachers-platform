import Schema, { Column } from "@db/Schema";
const DataTypes = require("../dataTypes");

const schema = new Schema({
  name: "teachers",
  columns: new Map<String, Column>([
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
      "firstname",
      new Column({
        name: "firstname",
        isRequired: true,
        displayName: "Firstname",
        type: DataTypes.TEXT,
      }),
    ],
    [
      "lastname",
      new Column({
        name: "lastname",
        isRequired: true,
        displayName: "Lastname",
        type: DataTypes.TEXT,
      }),
    ],
    [
      "username",
      new Column({
        name: "username",
        isRequired: true,
        displayName: "Username",
        type: DataTypes.TEXT,
        constraints: "UNIQUE",
      }),
    ],
    [
      "password",
      new Column({
        name: "password",
        isRequired: true,
        displayName: "Password",
        type: DataTypes.PASSWORD,
      }),
    ],
    [
      "picture",
      new Column({
        name: "picture",
        displayName: "User picture",
        type: DataTypes.BYTEA,
      }),
    ],
  ]),
});

export default schema;
