import { ColumnDefinition } from "@db/Schema";

const mapColumnsToDisplayNames = (columns: Array<ColumnDefinition>) => {
  return Object.fromEntries(
    columns.map(({ name, displayName }) => [name, displayName])
  );
};

export default mapColumnsToDisplayNames;
