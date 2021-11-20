const dataTypes = {
  integer: {
    dataType: "integer",
    htmlType: "number",
  },
  text: {
    dataType: "text",
    htmlType: "text",
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
