import DataTypes, {
  DataType,
  DataTypeDefinition,
  SelectableOption,
  SelectableDataTypeDefinition,
} from "@db/DataTypes";

export type SchemaDefinition = {
  name: string;
  columns: Array<ColumnDefinition>;
  withoutIdentifier?: boolean;
};

export type ColumnDefinition = {
  name: string;
  displayName: string;
  type: DataTypeDefinition | SelectableDataTypeDefinition;
  isRequired?: boolean;
  constraints?: string;
  columnName?: string;
};

export interface ColumnDefinitionWithValue extends ColumnDefinition {
  value?: string | null;
}

abstract class ColumnAbstract {
  abstract toObject(): ColumnDefinition;
}

abstract class ColumnWithDisplayName {
  abstract withDisplayName(displayName: string): ColumnDefinition;
}

interface ColumnWithOptions {
  asSelectable(options: Array<SelectableOption>): ColumnDefinition;
}

interface ColumnWithValue {
  withValue(value?: string): ColumnDefinitionWithValue;
}

// !!! interface can extends multiple interfaces via comma

export class Column
  extends ColumnAbstract
  implements Readonly<ColumnDefinition>, ColumnWithOptions, ColumnWithValue
{
  readonly name: string;
  readonly displayName: string;
  readonly type: DataType;
  readonly isRequired?: boolean = false;
  readonly constraints: string | null = null;
  readonly columnName: string | null = null;

  constructor(columnDefinition: ColumnDefinition) {
    super();
    Object.assign(this, columnDefinition);

    if (columnDefinition.type === DataTypes.FOREIGN_KEY) {
      this.columnName = this.name;
    }
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

  withDisplayName(displayName: string): ColumnDefinition {
    return {
      name: this.name,
      displayName: displayName,
      type: this.type.toObject ? this.type.toObject() : this.type,
      isRequired: this.isRequired,
      constraints: this.constraints,
      columnName: this.columnName,
    };
  }

  asSelectable(options: Array<SelectableOption>): ColumnDefinition {
    return Object.assign(this.toObject(), {
      type: this.type.asSelectable
        ? this.type.asSelectable(options)
        : this.type,
    });
  }
}

export type ColumnValue = {
  name: string;
  value: string | number;
  type?: string;
};

export class Schema implements Readonly<SchemaDefinition> {
  readonly name: string;
  readonly columns: Array<Column> = [];
  readonly withoutIdentifier?: boolean = false;

  constructor(schemaDefinition: SchemaDefinition) {
    Object.assign(this, schemaDefinition);
    if (!this.withoutIdentifier) {
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
  }

  column(columnName: string): Column {
    return this.columns.find((c) => c.name === columnName);
  }
}

export default Schema;
