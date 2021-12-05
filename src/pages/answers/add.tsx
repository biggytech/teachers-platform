import { createEditPage } from "@components/pages";
import { getAddAnswersProps } from "@services/pages/answers/getAddAnswersProps";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Answers",
  name: "answer",
  action: "/api/answers/add",
});

export const getServerSideProps = async ({ query, req, res }) => {
  const props = await runGetServerSideProps({ query, req, res });
  return {
    props: {
      //   ...props,
      ...getAddAnswersProps({
        questionId: +query.question_id || null,
      }),
    },
  };
};

export default EditPage;
