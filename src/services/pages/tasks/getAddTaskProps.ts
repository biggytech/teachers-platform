import schema from "@db/tasks/tasksSchema";
import { Column } from "@db/Schema";

const getAddTaskProps = async ({ pointId }) => {
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

export default getAddTaskProps;
