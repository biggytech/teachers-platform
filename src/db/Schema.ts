export type SchemaDefinition = {
  name: string;
  columns: Map<string, ColumnDefinition>;
};

export type ColumnDefinition = {
  name: string;
  displayName: string;
  type: any;
  isRequired?: boolean;
  constraints?: string;
  columnName?: string;
};

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
      type: this.type,
      isRequired: this.isRequired,
      constraints: this.constraints,
      columnName: this.columnName,
    };
  }
}

export type ColumnValue = {
  name: string;
  value: string | number;
  type?: string; // TODO: data types here
};

export class Schema implements SchemaDefinition {
  name: string;
  columns: Map<string, Column> = new Map();

  constructor(schemaDefinition: SchemaDefinition) {
    Object.assign(this, schemaDefinition);
  }

  column(columnName: string): Column {
    return this.columns.get(columnName);
  }
}

export default Schema;
