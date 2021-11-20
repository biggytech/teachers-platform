const dataTypes = require("../dataTypes");

const schema = {
  name: "users",
  columns: {
    id: {
      name: "id",
      displayName: "Id",
      type: dataTypes.integer,
      isRequired: true,
      constraints: "SERIAL PRIMARY KEY",
    },
    firstname: {
      name: "firstname",
      isRequired: true,
      displayName: "Firstname",
      type: dataTypes.text,
    },
    lastname: {
      name: "lastname",
      isRequired: true,
      displayName: "Lastname",
      type: dataTypes.text,
    },
    username: {
      name: "username",
      isRequired: true,
      displayName: "Username",
      type: dataTypes.text,
      constraints: "UNIQUE",
    },
    password: {
      name: "password",
      isRequired: true,
      displayName: "Password",
      type: dataTypes.text,
    },
    role: {
      name: "role",
      isRequired: true,
      displayName: "Role",
      type: dataTypes.role,
    },
    picture: {
      name: "picture",
      displayName: "User picture",
      type: dataTypes.bytea,
    },
  },
};

module.exports = schema;