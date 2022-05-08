import { taskMarksSchema } from "@db/task_marks/taskMarksSchema";
import taskMarksService from "@db/task_marks/taskMarksService";

export const getTaskMarksProps = async ({ planId }) => {
  const columns = [
    taskMarksSchema.column("mark").toObject(),
    taskMarksSchema.column("task_id").toObject(),
    taskMarksSchema.column("plan_id").toObject(),
  ];

  const data = await taskMarksService.getAllByPlanId(planId);

  return {
    data: {
      columns: [
        taskMarksSchema.column("mark").toObject(),
        { name: "task_title", displayName: "Практическое задание" },
        { name: "program_title", displayName: "Учебный план" },
      ],
      rows: data.map(item => ({
        ...item,
        task_title: item.task.title,
        program_title: item.program.title
      })),
    },
  };
};
