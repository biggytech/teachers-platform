import Schema, { Column } from "@db/Schema";
import DataTypes from "@db/DataTypes";
import { DisplayNames } from "@services/DisplayNames";

const schema = new Schema({
  name: "programs",
  columns: [
    new Column({
      name: "title",
      isRequired: true,
      displayName: DisplayNames.title,
      type: DataTypes.TEXT,
    }),

    new Column({
      name: "description",
      displayName: DisplayNames.description,
      type: DataTypes.TEXT,
    }),

    new Column({
      name: "owner_id",
      displayName: DisplayNames.owner_id,
      type: DataTypes.FOREIGN_KEY,
    }),
  ],
});

export default schema;
