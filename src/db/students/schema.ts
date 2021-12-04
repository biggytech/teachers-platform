const DataTypes = require("../dataTypes");

const schema = {
  name: "students",
  columns: {
    id: {
      name: "id",
      displayName: "Id",
      type: DataTypes.INTEGER,
      isRequired: true,
      constraints: "SERIAL PRIMARY KEY",
    },
    firstname: {
      name: "firstname",
      isRequired: true,
      displayName: "Firstname",
      type: DataTypes.TEXT,
    },
    lastname: {
      name: "lastname",
      isRequired: true,
      displayName: "Lastname",
      type: DataTypes.TEXT,
    },
    username: {
      name: "username",
      isRequired: true,
      displayName: "Username",
      type: DataTypes.TEXT,
      constraints: "UNIQUE",
    },
    password: {
      name: "password",
      isRequired: true,
      displayName: "Password",
      type: DataTypes.PASSWORD,
    },
    picture: {
      name: "picture",
      displayName: "User picture",
      type: DataTypes.BYTEA,
    },
    teacher_id: {
      name: "teacher_id",
      columnName: "teacher",
      displayName: "Teacher",
      type: DataTypes.FOREIGN_KEY,
    },
  },
};

module.exports = schema;
