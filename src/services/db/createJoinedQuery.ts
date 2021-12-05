import { ColumnDefinition, SchemaDefinition } from "@db/Schema";

type CreateJoinQueryProps = {
  schema1: SchemaDefinition;
  schema2: SchemaDefinition;
  field1: ColumnDefinition;
  field2: ColumnDefinition;
  columns1: Array<ColumnDefinition>;
  columns2: Array<ColumnDefinition>;
  where?: {
    column: ColumnDefinition;
    value: any;
  };
  limit?: number;
};

const createJoinedQuery = ({
  schema1,
  schema2,
  field1,
  field2,
  columns1,
  columns2,
  where,
  limit = 0,
}: CreateJoinQueryProps) => {
  const query = {
    text: `select ${columns1
      .map(({ name }) => `${schema1.name}.${name}`)
      .join(",")}, 
        ${columns2.map(({ name }) => `${schema2.name}.${name}`).join(",")} 
        from ${schema1.name} 
        inner join ${schema2.name} on ${schema1.name}.${field1.name} = ${
      schema2.name
    }.${field2.name} 
        ${where ? `where ${schema1.name}.${where.column.name}=$1` : ""} 
        ${limit ? `limit ${limit}` : ""};`,
    values: [where.value],
  };

  return query;
};

export default createJoinedQuery;
