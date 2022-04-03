import plansService from "@db/plans/plansService";
import plansSchema from "@db/plans/plansSchema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";

export const getSinglePlanProps = async ({ id }) => {
  const columns = [
    plansSchema.column("id").toObject(),
    plansSchema.column("start_date").toObject(),
  ];

  const data = await plansService.get(id);

  return {
    data: {
      ...data,
      student: data
        ? data.student.firstname + " " + data.student.lastname
        : null,
      program: data ? data.program.title : null,
    },
    id,
    mapData: mapColumnsToDisplayNames(
      columns
        .filter(({ name }) => name !== "student_id" && name !== "program_id")
        .concat([
          { name: "student", displayName: "Студент" },
          { name: "program", displayName: "Программа" },
        ])
    ),
  };
};
