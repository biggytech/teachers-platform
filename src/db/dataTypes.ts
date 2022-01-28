export enum DBDataType {
  integer,
  text,
  bytea,
  date,
  boolean,
  smallint,
}

export enum HtmlType {
  number,
  text,
  password,
  file,
  hidden,
  url,
  date,
  select,
  checkbox,
}

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
  constructor(readonly dataType: DBDataType, readonly htmlType: HtmlType) {}

  toObject(): DataTypeDefinition {
    return {
      dataType: this.dataType,
      htmlType: this.htmlType,
    };
  }

  asSelectable(options: Array<SelectableOption>): SelectableDataTypeDefinition {
    return Object.assign(this.toObject(), {
      htmlType: HtmlType.select,
      options,
    });
  }
}

export class DataTypes {
  static readonly INTEGER = new DataType(DBDataType.integer, HtmlType.number);
  static readonly SMALL_INTEGER = new DataType(
    DBDataType.smallint,
    HtmlType.number
  );
  static readonly TEXT = new DataType(DBDataType.text, HtmlType.text);
  static readonly URL = new DataType(DBDataType.text, HtmlType.url);
  static readonly PASSWORD = new DataType(DBDataType.text, HtmlType.password);
  static readonly BYTEA = new DataType(DBDataType.bytea, HtmlType.file);
  static readonly FOREIGN_KEY = new DataType(
    DBDataType.integer,
    HtmlType.hidden
  );
  static readonly MULTIPLE_FOREIGN_KEY = new DataType(
    DBDataType.integer,
    HtmlType.hidden
  );
  static readonly DATE = new DataType(DBDataType.date, HtmlType.date);
  static readonly BOOLEAN = new DataType(DBDataType.boolean, HtmlType.checkbox);
}

export default DataTypes;
