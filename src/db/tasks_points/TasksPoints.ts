import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class TasksPoints extends Model {}
TasksPoints.init(
  {
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    point_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  { sequelize, tableName: "tasks_points", timestamps: false }
);

export default TasksPoints;
