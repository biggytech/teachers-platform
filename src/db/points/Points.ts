import { Model, DataTypes } from "sequelize";
import sequelize from "@db/sequelize";

class Points extends Model {}
Points.init(
  {
    title: {
      type: DataTypes.TEXT,
      // validate: {
      //   is: ["[a-z]",'i'],    // will only allow letters
      //   max: 23,          // only allow values <= 23
      //   isIn: {
      //   args: [['en', 'zh']],
      //   msg: "Must be English or Chinese"
      //   }
      // },
      // field: 'column_a'
      // Other attributes here
    },
    description: DataTypes.TEXT,
    duration_days: DataTypes.INTEGER,
    program_id: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, tableName: "points", timestamps: false }
);

// Points.belongsTo()

export default Points;
