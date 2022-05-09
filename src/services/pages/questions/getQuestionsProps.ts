import questionsService from "@db/questions/questionsService";
import questionsSchema from "@db/questions/questionsSchema";

const getQuestionsProps = async ({ testId }) => {
  const columns = [
    questionsSchema.column("id").toObject(),
    questionsSchema.column("description").toObject(),
  ];

  const data = await questionsService.getAllBy('test_id', testId);
  return {
    data: {
      columns,
      rows: data,
    },
  };
};

export default getQuestionsProps;
