import { createQueryPage } from "@components/pages";
import getAnswersProps from "@services/pages/answers/getAnswersProps";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Ответы на вопросы тестов",
  addLink: (contextId) => `/answers/add?question_id=${contextId}`,
  isUsePagination: false,
});

export const getServerSideProps = async ({ query, req }) => {
  const props = await runGetServerSideProps({ query, req });
  return {
    props: {
      ...props,
      ...(await getAnswersProps({
        questionId: +query.question_id || null,
      })),
      contextId: +query.question_id || null,
    },
  };
};

export default QueryPage;
