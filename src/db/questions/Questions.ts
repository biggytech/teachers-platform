import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class Questions extends Model {}
Questions.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    test_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "questions", timestamps: false }
);

export default Questions;
