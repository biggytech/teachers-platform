import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class Tasks extends Model {}
Tasks.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
  },
  { sequelize, tableName: "tasks", timestamps: false }
);

export default Tasks;
