export type DBDataType = "integer" | "text" | "bytea";
export type HtmlType = "number" | "text" | "password" | "file";

export type DataTypeDefinition = {
  dataType: DBDataType;
  htmlType: HtmlType;
};

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
}

export class DataTypes {
  static readonly INTEGER = new DataType("integer", "number");
  static readonly TEXT = new DataType("text", "text");
  static readonly PASSWORD = new DataType("text", "password");
  static readonly BYTEA = new DataType("bytea", "file");
  static readonly FOREIGN_KEY = new DataType("integer", "number");
}

module.exports = DataTypes;
