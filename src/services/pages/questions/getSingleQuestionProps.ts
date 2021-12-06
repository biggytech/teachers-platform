import { getQuestion } from "@db/questions/questionsQueries";
import questionsSchema from "@db/questions/questionsSchema";
import testsSchema from "@db/tests/testsSchema";
import mapColumnsToDisplayNames from "@services/mapColumnsToDisplayNames";

export const getSingleQuestionProps = async ({ id }) => {
  const columns = [
    questionsSchema.column("id").toObject(),
    questionsSchema.column("description").toObject(),
    questionsSchema.column("test_id").toObject(),
  ];

  const data = await getQuestion({
    columns,
    id,
  });

  return {
    data,
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
