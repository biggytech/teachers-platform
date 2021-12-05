import { ColumnValue } from "@db/Schema";
import schema from "@db/tasks/tasksSchema";
import tasksPointsSchema from "@db/tasks_points/tasksPointsSchema";
import {
  executeQuery,
  createSimpleInsertQuery,
  createJoinedQuery,
} from "@services/db";

export const addTask = async ({ columns, pointId }) => {
  const query = createSimpleInsertQuery({ schema, columns });

  const results = await executeQuery(query);
  console.log(results);
  const taskId = results.rows[0].id;
  console.log(taskId);

  const query2 = createSimpleInsertQuery({
    schema: tasksPointsSchema,
    returnId: false,
    columns: [
      {
        name: tasksPointsSchema.column("task_id").name,
        value: taskId,
      },
      {
        name: tasksPointsSchema.column("point_id").name,
        value: pointId,
      },
    ],
  });

  await executeQuery(query2);
};

export const getTasks = async ({ columns, pointId }) => {
  const query = createJoinedQuery({
    schema1: tasksPointsSchema,
    schema2: schema,
    field1: tasksPointsSchema.column("task_id"),
    field2: schema.column("id"),
    columns1: [tasksPointsSchema.column("point_id")],
    columns2: columns,
    where: {
      column: tasksPointsSchema.column("point_id"),
      value: pointId,
    },
  });

  const results = await executeQuery(query);

  return results.rows;
};
