import questionsService from "@db/questions/questionsService";
import questionsSchema from "@db/questions/questionsSchema";
import testsSchema from "@db/tests/testsSchema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";

export const getSingleQuestionProps = async ({ id }) => {
  const columns = [
    questionsSchema.column("id").toObject(),
    questionsSchema.column("description").toObject(),
    questionsSchema.column("test_id").toObject(),
  ];

  const data = await questionsService.get(id);

  return {
    data: data ? {
      ...data,
      title: data.test.title
    } : null,
    id,
    mapData: mapColumnsToDisplayNames(
      columns
        .filter(({ name }) => name !== "test_id")
        .concat(
          testsSchema
            .column("title")
            .withDisplayName(questionsSchema.column("test_id").displayName)
        )
    ),
  };
};
