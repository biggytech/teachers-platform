import { getPlan } from "@db/plans/plansQueries";
import plansSchema from "@db/plans/plansSchema";

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

  return { data, id };
};
