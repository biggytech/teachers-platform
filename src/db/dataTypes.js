const dataTypes = {
  integer: {
    dataType: "integer",
    htmlType: "number",
  },
  text: {
    dataType: "text",
    htmlType: "text",
  },
  password: {
    dataType: "text",
    htmlType: "password",
  },
  bytea: {
    dataType: "bytea",
    htmlType: "file",
  },
  role: {
    dataType: "role",
    type: "enum",
    data: {
      student: "student",
      teacher: "teacher",
      admin: "admin",
    },
    htmlType: "text",
  },
};

module.exports = dataTypes;
