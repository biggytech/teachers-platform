import { getQuestions } from "@db/questions/questionsQueries";
import questionsSchema from "@db/questions/questionsSchema";

const getQuestionsProps = async ({ testId }) => {
  const columns = [
    questionsSchema.column("id").toObject(),
    questionsSchema.column("description").toObject(),
  ];

  const data = await getQuestions({ columns, testId });
  return {
    data: {
      columns,
      rows: data,
    },
  };
};

export default getQuestionsProps;
