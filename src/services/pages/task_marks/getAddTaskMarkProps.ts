import tasksService from "@db/tasks/tasksService";
import { taskMarksSchema } from "@db/task_marks/taskMarksSchema";

export const getAddTaskMarkProps = async ({ planId, pointId }) => {
  const tasks = await tasksService.getAllToMark(planId, pointId);
  const columns = [
    taskMarksSchema.column("mark").toObject(),
    taskMarksSchema.column("task_id").asSelectable(
      tasks.map(({ id, title }) => ({
        name: id,
        displayName: title,
      }))
    ),
    taskMarksSchema.column("plan_id").withValue(planId),
    {
      name: "point_id",
      displayName: "point_id",
      type: {
        dataType: "integer",
        htmlType: 4,
      },
      isRequired: false,
      columnName: "point_id",
      value: pointId,
    },
  ];

  return { columns, planId, pointId };
};
