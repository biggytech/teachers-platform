import { getTest } from "@db/tests/testsQueries";
import schema from "@db/tests/testsSchema";

const getSingleTestProps = async ({ id }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];

  const data = await getTest({
    id,
    columns,
  });
  return {
    data,
    id,
  };
};

export default getSingleTestProps;
