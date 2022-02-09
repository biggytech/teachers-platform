import schema from "@db/plans/plansSchema";
import plansService from "@db/plans/plansService";

const getPlansProps = async ({ studentId }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("start_date").toObject(),
  ];
  const data = await plansService.getAllBy("student_id", studentId);

  const newColumns = columns
    .concat({
      name: "programName",
      displayName: schema.column("program_id").displayName,
    })
    .concat({
      name: "studentName",
      displayName: schema.column("student_id").displayName,
    });

  return {
    data: {
      columns: newColumns,
      rows: data.map(({ program, student, ...item }) => ({
        ...item,
        programName: program.title,
        studentName: student.firstname + " " + student.lastname,
      })),
    },
    studentId,
  };
};

export default getPlansProps;
