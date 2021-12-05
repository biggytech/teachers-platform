import answersSchema from "@db/answers/answersSchema";

export const getAddAnswersProps = ({ questionId }) => {
  const columns = [
    answersSchema.column("description").toObject(),
    answersSchema.column("is_correct").toObject(),
    answersSchema.column("question_id").withValue(questionId),
  ];

  console.log(columns);

  return {
    columns,
  };
};
