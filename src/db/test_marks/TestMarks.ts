import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class TestMarks extends Model {}
TestMarks.init(
  {
    mark: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    test_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    plan_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, tableName: "test_marks", timestamps: false }
);

export default TestMarks;
