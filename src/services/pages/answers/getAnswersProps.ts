import { getAnswers } from "@db/answers/answersQueries";
import answersSchema from "@db/answers/answersSchema";

const getAnswersProps = async ({ questionId }) => {
  const columns = [
    answersSchema.column("id").toObject(),
    answersSchema.column("description").toObject(),
    answersSchema.column("is_correct").toObject(),
    answersSchema.column("question_id").toObject(),
  ];

  const data = await getAnswers({
    columns,
    questionId,
  });

  return {
    data: {
      columns,
      rows: data,
    },
  };
};

export default getAnswersProps;
