import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class TaskMarks extends Model {}
TaskMarks.init(
  {
    mark: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    task_id: {
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
  { sequelize, tableName: "task_marks", timestamps: false }
);

export default TaskMarks;
