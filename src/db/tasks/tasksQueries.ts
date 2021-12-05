import { ColumnValue } from "@db/Schema";
import schema from "@db/tasks/tasksSchema";
import { executeQuery, createSimpleInsertQuery } from "@services/db";
import tasksPointsSchema from "@db/tasks_points/tasksPointsSchema";

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
