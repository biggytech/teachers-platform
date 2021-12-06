import { taskMarksSchema } from "@db/task_marks/taskMarksSchema";
import { getTaskMarks } from "@db/task_marks/taskMarksQueries";

export const getTaskMarksProps = async ({ planId }) => {
  const columns = [
    taskMarksSchema.column("mark").toObject(),
    taskMarksSchema.column("task_id").toObject(),
    taskMarksSchema.column("plan_id").toObject(),
  ];

  const data = await getTaskMarks({ columns, planId });
  return {
    data: {
      columns: [
        taskMarksSchema.column("mark").toObject(),
        { name: "task_title", displayName: "Практическое задание" },
        { name: "program_title", displayName: "Учебный план" },
      ],
      rows: data,
    },
  };
};