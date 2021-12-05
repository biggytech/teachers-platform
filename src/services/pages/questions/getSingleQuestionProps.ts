import { getQuestion } from "@db/questions/questionsQueries";
import questionsSchema from "@db/questions/questionsSchema";

export const getSingleQuestionProps = async ({ id }) => {
  const columns = [
    questionsSchema.column("id").toObject(),
    questionsSchema.column("description").toObject(),
    questionsSchema.column("test_id").toObject(),
  ];

  console.log(columns);
  console.log(id);

  const data = await getQuestion({
    columns,
    id,
  });

  console.log(data);

  return { data, id };
};
