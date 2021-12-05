import {
  createSelectByQuery,
  createSimpleInsertQuery,
  executeQuery,
} from "@services/db";
import { taskMarksSchema } from "./taskMarksSchema";

export const getTaskMarks = async ({ columns, planId }) => {
  const query = createSelectByQuery({
    schema: taskMarksSchema,
    columns,
    searchColumn: taskMarksSchema.column("plan_id").name,
    searchValue: planId,
  });

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
