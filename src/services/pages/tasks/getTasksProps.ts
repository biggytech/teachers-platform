import tasksService from "@db/tasks/tasksService";
import schema from "@db/tasks/tasksSchema";

const getTasksProps = async ({ pointId }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];

  const data = await tasksService.getAllByPointId(pointId);

  return {
    data: {
      columns: columns,
      rows: data,
    },
    pointId,
  };
};

export default getTasksProps;
