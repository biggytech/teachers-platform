import { getPointsByPlans } from "@db/points/index";
import schema from "@db/points/schema";

export const getPointsByPlansProps = async ({ planId }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("duration_days").toObject(),
  ];
  const data = await getPointsByPlans({
    columns,
    planId,
  });

  return {
    data: {
      columns,
      rows: data,
    },
    planId,
  };
};
