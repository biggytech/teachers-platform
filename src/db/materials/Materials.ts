import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class Materials extends Model {}
Materials.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    link: DataTypes.TEXT,
    program_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "materials", timestamps: false }
);

export default Materials;