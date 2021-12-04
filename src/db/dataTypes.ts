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
  foreignKey: {
    dataType: "integer",
    htmlType: "number", // TODO: fix to select value
  },
};

module.exports = dataTypes;
