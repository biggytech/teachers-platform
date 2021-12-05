import { getAvailableTasksToMark, getTasks } from "@db/tasks/tasksQueries";
import { taskMarksSchema } from "@db/task_marks/taskMarksSchema";

export const getAddTaskMarkProps = async ({ planId, pointId }) => {
  const tasks = await getAvailableTasksToMark({
    planId,
    pointId,
  });
  console.log(tasks);
  const columns = [
    taskMarksSchema.column("mark").toObject(),
    taskMarksSchema.column("task_id").asSelectable(
      tasks.map(({ id, title }) => ({
        name: id,
        displayName: title,
      }))
    ),
    taskMarksSchema.column("plan_id").withValue(planId),
  ];

  console.log(columns);

  return { columns, planId, pointId };
};
