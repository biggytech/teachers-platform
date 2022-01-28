import plansSchema from "./plansSchema";
import {
  executeQuery,
  createSimpleInsertQuery,
  createLimitedSelectQuery,
} from "@services/db";
import studentsSchema from "@db/students/schema";
import programsSchema from "@db/programs/programsSchema";

const addPlan = async ({ columns }) => {
  const query = createSimpleInsertQuery({ schema: plansSchema, columns });

  await executeQuery(query);
};

const getPlansWithStudentsAndPrograms = async ({
  columns,
  programColumn,
  studentId,
  studentColumn,
}) => {
  const query = {
    text: `
            SELECT ${columns
              .map(({ name }) => `${plansSchema.name}.${name}`)
              .join(",")}, 

              ${programsSchema.name}.${
      programsSchema.column("title").name
    } ${programColumn},
                ${studentsSchema.name}.${
      studentsSchema.column("firstname").name
    } || ' ' || ${studentsSchema.name}.${
      studentsSchema.column("lastname").name
    } ${studentColumn} 

              FROM "${plansSchema.name}" 

              INNER JOIN ${programsSchema.name} ON ${plansSchema.name}.${
      plansSchema.column("program_id").name
    } = ${programsSchema.name}.${programsSchema.column("id").name} 

      INNER JOIN ${studentsSchema.name} ON ${plansSchema.name}.${
      plansSchema.column("student_id").name
    } = ${studentsSchema.name}.${studentsSchema.column("id").name} 

              WHERE ${plansSchema.name}.${
      plansSchema.column("student_id").name
    }=$1;
            `,
    values: [studentId],
  };

  return (await executeQuery(query)).rows;
};

export const getPlan = async ({ columns, id }) => {
  const query = {
    text: `select plans.id, plans.start_date, plans.student_id, plans.program_id,
    students.firstname || ' ' || students.lastname as student_name,
    programs.title as program_title
    from plans 
    inner join students on plans.student_id = students.id 
    inner join programs 
    on plans.program_id = programs.id 
    where plans.id = $1`,
    values: [id],
  };
  // const query = createLimitedSelectQuery({
  //   schema: plansSchema,
  //   columns,
  //   searchColumn: plansSchema.column("id").name,
  //   searchValue: id,
  // });

  const results = await executeQuery(query);

  return results.rows[0] ?? null;
};

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

export { addPlan, getPlansWithStudentsAndPrograms };
