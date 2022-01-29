import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class Students extends Model {}
Students.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    picture: DataTypes.BLOB,
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "students", timestamps: false }
);

export default Students;
