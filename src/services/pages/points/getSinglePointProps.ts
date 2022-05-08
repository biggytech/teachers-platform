import pointsService from "@db/points/pointsService";
import schema from "@db/points/schema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";

const getSinglePointProps = async ({ id }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("duration_days").toObject(),
  ];

  const data = await pointsService.get(id);

  return {
    data,
    id,
    mapData: mapColumnsToDisplayNames(columns),
  };
};

export default getSinglePointProps;
