const dataTypes = require("../dataTypes");

const schema = {
  name: "programs",
  columns: {
    id: {
      name: "id",
      displayName: "Id",
      type: dataTypes.integer,
      isRequired: true,
      constraints: "SERIAL PRIMARY KEY",
    },
    title: {
      name: "title",
      isRequired: true,
      displayName: "Title",
      type: dataTypes.text,
    },
    description: {
      name: "description",
      displayName: "Description",
      type: dataTypes.text,
    },
    owner_id: {
      name: "owner_id",
      columnName: "owner",
      displayName: "Owner",
      type: dataTypes.foreignKey,
    },
  },
};

module.exports = schema;
