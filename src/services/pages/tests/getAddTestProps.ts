import schema from "@db/tests/testsSchema";
import { Column } from "@db/Schema";

const getAddTestProps = async ({ pointId }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
    schema.column("point_id").withValue(pointId),
  ];

  return {
    columns,
    pointId,
  };
};

export default getAddTestProps;
