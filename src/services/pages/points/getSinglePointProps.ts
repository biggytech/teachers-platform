import { getPoint } from "@db/points/index";
import schema from "@db/points/schema";

const getSinglePointProps = async ({ id }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("duration_days").toObject(),
  ];

  const data = await getPoint({
    id,
    columns,
  });

  return {
    data,
    id,
  };
};

export default getSinglePointProps;
