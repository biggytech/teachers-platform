import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class Tests extends Model {}
Tests.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
  },
  { sequelize, tableName: "tests", timestamps: false }
);

export default Tests;
