import { getAnswers } from "@db/answers/answersQueries";
import answersSchema from "@db/answers/answersSchema";

const getAnswersProps = async ({ questionId }) => {
  const columns = [
    answersSchema.column("id").toObject(),
    answersSchema.column("description").toObject(),
    answersSchema.column("is_correct").toObject(),
  ];

  const data = await getAnswers({
    columns,
    questionId,
    questionColumn: answersSchema.column("question_id").columnName,
  });

  const newColumns = columns.concat({
    name: answersSchema.column("question_id").columnName,
    displayName: answersSchema.column("question_id").displayName,
  });

  return {
    data: {
      columns: newColumns,
      rows: data,
    },
  };
};

export default getAnswersProps;
