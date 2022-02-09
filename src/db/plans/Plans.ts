import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class Plans extends Model {}
Plans.init(
  {
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    program_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "plans", timestamps: false }
);

export default Plans;
