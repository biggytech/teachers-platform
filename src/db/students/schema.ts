import Schema, { Column } from "@db/Schema";

import DataTypes from "@db/DataTypes";

const schema = new Schema({
  name: "students",
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
    new Column({
      name: "teacher_id",
      displayName: "Teacher",
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

export default schema;
