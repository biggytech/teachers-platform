import questionsSchema from "@db/questions/questionsSchema";

const getAddQuestionProps = async ({ testId }) => {
  console.log("test id", testId);
  const columns = [
    questionsSchema.column("description").toObject(),
    questionsSchema.column("test_id").withValue(testId),
  ];

  console.log(columns);

  return { columns };
};

export default getAddQuestionProps;
