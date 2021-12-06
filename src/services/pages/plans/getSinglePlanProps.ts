import { getPlan } from "@db/plans/plansQueries";
import plansSchema from "@db/plans/plansSchema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";

export const getSinglePlanProps = async ({ id }) => {
  const columns = [
    plansSchema.column("id").toObject(),
    plansSchema.column("start_date").toObject(),
    plansSchema.column("student_id").toObject(),
    plansSchema.column("program_id").toObject(),
  ];

  const data = await getPlan({
    columns,
    id,
  });

  return {
    data,
    id,
    mapData: mapColumnsToDisplayNames(
      columns
        .filter(({ name }) => name !== "student_id" && name !== "program_id")
        .concat([
          { name: "student_name", displayName: "Студент" },
          { name: "program_title", displayName: "Программа" },
        ])
    ),
  };
};
