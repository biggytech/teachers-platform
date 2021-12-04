import plansSchema from "./plansSchema";
import { executeQuery, createSimpleInsertQuery } from "@services/db";
import studentsSchema from "@db/students/schema";
import programsSchema from "@db/programs/schema";

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

export { addPlan, getPlansWithStudentsAndPrograms };
