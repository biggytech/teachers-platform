import answersService from "@db/answers/answersService";
import answersSchema from "@db/answers/answersSchema";

const getAnswersProps = async ({ questionId }) => {
  const columns = [
    answersSchema.column("id").toObject(),
    answersSchema.column("description").toObject(),
    answersSchema.column("is_correct").toObject(),
  ];

  const data = await answersService.getAllBy('question_id', questionId);

  const newColumns = columns.concat({
    name: answersSchema.column("question_id").columnName,
    displayName: answersSchema.column("question_id").displayName,
  });

  return {
    data: {
      columns: newColumns,
      rows: data.map(item => ({...item, question_id: item.question.description})),
    },
  };
};

export default getAnswersProps;
