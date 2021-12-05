import { getQuestion } from "@db/questions/questionsQueries";
import questionsSchema from "@db/questions/questionsSchema";

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

  return { data, id };
};
