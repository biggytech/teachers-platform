import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class Points extends Model {}
Points.init(
  {
    title: {
      type: DataTypes.TEXT,
    },
    description: DataTypes.TEXT,
    duration_days: DataTypes.INTEGER,
    program_id: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, tableName: "points", timestamps: false }
);

export default Points;
