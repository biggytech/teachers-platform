import questionsSchema from "@db/questions/questionsSchema";

const getAddQuestionProps = async ({ testId }) => {
  const columns = [
    questionsSchema.column("description").toObject(),
    questionsSchema.column("test_id").withValue(testId),
  ];

  return { columns };
};

export default getAddQuestionProps;
