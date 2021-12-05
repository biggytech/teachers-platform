import { ColumnValue } from "@db/Schema";
import tasksSchema from "@db/tasks/tasksSchema";
import schema from "@db/tasks/tasksSchema";
import tasksPointsSchema from "@db/tasks_points/tasksPointsSchema";
import { taskMarksSchema } from "@db/task_marks/taskMarksSchema";
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

export const getAvailableTasksToMark = async ({ planId, pointId }) => {
  const query = {
    text: `select * from ${tasksSchema.name} 
    inner join ${tasksPointsSchema.name} 
    on ${tasksSchema.name}.${tasksSchema.column("id").name} = ${
      tasksPointsSchema.name
    }.${tasksPointsSchema.column("task_id").name} 
    left join ${taskMarksSchema.name}
    on ${tasksSchema.name}.${tasksSchema.column("id").name} = ${
      taskMarksSchema.name
    }.${taskMarksSchema.column("task_id").name} and
    ${taskMarksSchema.column("plan_id").name} = $1
    where ${tasksPointsSchema.column("point_id").name} = $2 and
    ${taskMarksSchema.column("plan_id").name} is null;`,
    values: [planId, pointId],
  };

  console.log(query);

  const results = await executeQuery(query);

  return results.rows;
};
