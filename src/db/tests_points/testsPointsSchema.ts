import DataTypes from "@db/DataTypes";
import Schema, { Column } from "@db/Schema";

const testsPointsSchema = new Schema({
  name: "tests_points",
  withoutIdentifier: true,
  columns: [
    new Column({
      name: "test_id",
      displayName: "Тест",
      isRequired: true,
      type: DataTypes.FOREIGN_KEY,
    }),
    new Column({
      name: "point_id",
      displayName: "Пункт программы",
      isRequired: true,
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

export default testsPointsSchema;
