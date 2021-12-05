import { getTests } from "@db/tests/testsQueries";
import schema from "@db/tasks/tasksSchema";

const getTestsProps = async ({ pointId }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];

  const data = await getTests({
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

export default getTestsProps;
