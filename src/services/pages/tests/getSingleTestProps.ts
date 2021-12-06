import { getTest } from "@db/tests/testsQueries";
import schema from "@db/tests/testsSchema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";

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
    mapData: mapColumnsToDisplayNames(columns),
  };
};

export default getSingleTestProps;
