import {
  createSelectByQuery,
  createSimpleInsertQuery,
  executeQuery,
} from "@services/db";
import { taskMarksSchema } from "./taskMarksSchema";

export const getTaskMarks = async ({ columns, planId }) => {
  const query = {
    text: `select task_marks.mark, task_marks.task_id, task_marks.plan_id,
    tasks.title as task_title, 
    programs.title as program_title 
    from task_marks 
    inner join tasks 
    on task_marks.task_id = tasks.id 
    inner join plans 
    on task_marks.plan_id = plans.id 
    inner join programs 
    on plans.program_id = programs.id
    where task_marks.plan_id = $1`,
    values: [planId],
  };
  // const query = createSelectByQuery({
  //   schema: taskMarksSchema,
  //   columns,
  //   searchColumn: taskMarksSchema.column("plan_id").name,
  //   searchValue: planId,
  // });

  const results = await executeQuery(query);
  return results.rows;
};

export const addTaskMark = async ({ columns }) => {
  const query = createSimpleInsertQuery({
    schema: taskMarksSchema,
    columns,
    returnId: false,
  });

  await executeQuery(query);
};
