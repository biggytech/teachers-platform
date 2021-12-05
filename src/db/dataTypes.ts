export type DBDataType = "integer" | "text" | "bytea" | "date";
export type HtmlType =
  | "number"
  | "text"
  | "password"
  | "file"
  | "hidden"
  | "url"
  | "date"
  | "select";

export type DataTypeDefinition = {
  dataType: DBDataType;
  htmlType: HtmlType;
};

export type SelectableOption = {
  name: string;
  displayName: string;
};

export interface SelectableDataTypeDefinition extends DataTypeDefinition {
  options: Array<SelectableOption>;
}

export class DataType implements DataTypeDefinition {
  dataType: DBDataType;
  htmlType: HtmlType;

  constructor(dt: DBDataType, ht: HtmlType) {
    this.dataType = dt;
    this.htmlType = ht;
  }

  toObject(): DataTypeDefinition {
    return {
      dataType: this.dataType,
      htmlType: this.htmlType,
    };
  }

  asSelectable(options: Array<SelectableOption>): SelectableDataTypeDefinition {
    return Object.assign(this.toObject(), {
      htmlType: "select",
      options,
    });
  }
}

export class DataTypes {
  static readonly INTEGER = new DataType("integer", "number");
  static readonly TEXT = new DataType("text", "text");
  static readonly URL = new DataType("text", "url");
  static readonly PASSWORD = new DataType("text", "password");
  static readonly BYTEA = new DataType("bytea", "file");
  static readonly FOREIGN_KEY = new DataType("integer", "hidden");
  static readonly MULTIPLE_FOREIGN_KEY = new DataType("integer", "hidden");
  static readonly DATE = new DataType("date", "date");
}

export default DataTypes;
