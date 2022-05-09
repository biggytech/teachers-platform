import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class TestsPoints extends Model {}
TestsPoints.init(
  {
    test_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    point_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  { sequelize, tableName: "tests_points", timestamps: false }
);

export default TestsPoints;
