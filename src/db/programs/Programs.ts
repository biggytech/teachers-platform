import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class Programs extends Model {}
Programs.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "programs", timestamps: false }
);

export default Programs;
