import { getPlansWithStudentsAndPrograms } from "@db/plans/plansQueries";
import schema from "@db/plans/plansSchema";

const getPlansProps = async ({ studentId }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("start_date").toObject(),
  ];
  const data = await getPlansWithStudentsAndPrograms({
    studentId,
    columns,
    programColumn: schema.column("program_id").columnName,
    studentColumn: schema.column("student_id").columnName,
  });

  const newColumns = columns
    .concat({
      name: schema.column("program_id").columnName,
      displayName: schema.column("program_id").displayName,
    })
    .concat({
      name: schema.column("student_id").columnName,
      displayName: schema.column("student_id").displayName,
    });

  return {
    data: {
      columns: newColumns,
      rows: data,
    },
    studentId,
  };
};

export default getPlansProps;
