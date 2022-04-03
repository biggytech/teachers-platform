import plansSchema from "./plansSchema";
import { executeQuery, createSimpleInsertQuery } from "@services/db";

export const getReportData = async ({ planId }) => {
  const planQuery = {
    text: `
    select plans.student_id, 
    plans.program_id,
    plans.start_date,
    students.firstname || ' ' || students.lastname as student_name,
    programs.title
    from plans 
    inner join students
    on plans.student_id = students.id
    inner join programs
    on plans.program_id = programs.id
    where plans.id = $1;
    `,
    values: [planId],
  };
  const planResult = (await executeQuery(planQuery)).rows[0];

  const tasksMarksQuery = {
    text: `
    select mark from task_marks
where plan_id = $1;
    `,
    values: [planId],
  };

  let points = [];

  if (planResult) {
    const pointsQuery = {
      text: `
      select title from points
where points.program_id = $1;
      `,
      values: [planResult.program_id],
    };

    points = (await executeQuery(pointsQuery)).rows;
  }

  const tasksMarks = (await executeQuery(tasksMarksQuery)).rows;

  return {
    plan: planResult ?? null,
    points,
    tasksMarks,
  };
};
