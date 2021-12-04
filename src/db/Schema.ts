import DataTypes from "@db/dataTypes";

export type SchemaDefinition = {
  name: string;
  columns: Array<ColumnDefinition>;
};

export type ColumnDefinition = {
  name: string;
  displayName: string;
  type: any;
  isRequired?: boolean;
  constraints?: string;
  columnName?: string;
};

export interface ColumnDefinitionWithValue extends ColumnDefinition {
  value?: string | null;
}

export class Column implements ColumnDefinition {
  name: string;
  displayName: string;
  type: any;
  isRequired?: boolean = false;
  constraints: string | null = null;
  columnName: string | null = null;

  constructor(columnDefinition: ColumnDefinition) {
    Object.assign(this, columnDefinition);
  }

  toObject(): ColumnDefinition {
    return {
      name: this.name,
      displayName: this.displayName,
      type: this.type.toObject ? this.type.toObject() : this.type,
      isRequired: this.isRequired,
      constraints: this.constraints,
      columnName: this.columnName,
    };
  }

  withValue(value?: string): ColumnDefinitionWithValue {
    return Object.assign(this.toObject(), {
      value: value ?? null,
    });
  }
}

export type ColumnValue = {
  name: string;
  value: string | number;
  type?: string; // TODO: data types here
};

export class Schema implements SchemaDefinition {
  name: string;
  columns: Array<Column> = [];

  constructor(schemaDefinition: SchemaDefinition) {
    Object.assign(this, schemaDefinition);
    this.columns = [
      ...this.columns,
      new Column({
        name: "id",
        displayName: "Id",
        type: DataTypes.INTEGER,
        isRequired: true,
        constraints: "SERIAL PRIMARY KEY",
      }),
    ];
  }

  column(columnName: string): Column {
    return this.columns.find((c) => c.name === columnName);
  }
}

export default Schema;
