import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";
import Students from "@db/students/Students";

class Teachers extends Model {}
Teachers.init(
  {
    username: {
      type: DataTypes.STRING, // TODO: replace all STRING data types to VARCHAR(255) in create script!
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
    picture: {
      type: DataTypes.BLOB,
    },
  },
  { sequelize, tableName: "teachers", timestamps: false }
);

Teachers.hasMany(Students, { foreignKey: "teacher_id" });

export default Teachers;
