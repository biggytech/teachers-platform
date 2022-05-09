import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class Answers extends Model {}
Answers.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "answers", timestamps: false }
);

export default Answers;
