import testsService from "@db/tests/testsService";
import schema from "@db/tasks/tasksSchema";

const getTestsProps = async ({ pointId }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];

  const data = await testsService.getAllByPointId(pointId);

  return {
    data: {
      columns: columns,
      rows: data,
    },
    pointId,
  };
};

export default getTestsProps;
