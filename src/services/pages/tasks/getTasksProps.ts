import { getTasks } from "@db/tasks/tasksQueries";
import schema from "@db/tasks/tasksSchema";

const getTasksProps = async ({ pointId }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];

  const data = await getTasks({
    columns: columns,
    pointId,
  });

  return {
    data: {
      columns: columns,
      rows: data,
    },
    pointId,
  };
};

export default getTasksProps;
