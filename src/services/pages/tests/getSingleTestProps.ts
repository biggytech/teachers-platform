import testsService from "@db/tests/testsService";
import schema from "@db/tests/testsSchema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";

const getSingleTestProps = async ({ id }) => {
  const columns = [
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];

  const data = await testsService.get(id);
  return {
    data,
    id,
    mapData: mapColumnsToDisplayNames(columns),
  };
};

export default getSingleTestProps;
