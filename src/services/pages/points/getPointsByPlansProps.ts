import pointsService from "@db/points/pointsService";
import schema from "@db/points/schema";

export const getPointsByPlansProps = async ({ planId }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("duration_days").toObject(),
  ];
  const data = await pointsService.getAllByPlanId(planId);

  return {
    data: {
      columns,
      rows: data,
    },
    planId,
  };
};
