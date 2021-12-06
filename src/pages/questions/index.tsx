import { createQueryPage } from "@components/pages";
import getQuestionsProps from "@services/pages/questions/getQuestionsProps";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Вопросы",
  addLink: (contextId) => `/questions/add?test_id=${contextId}`,
  isUsePagination: false,
  pathName: "/questions",
});

export const getServerSideProps = async ({ query, req }) => {
  const props = await runGetServerSideProps({ query, req });
  return {
    props: {
      ...props,
      ...(await getQuestionsProps({
        ...props,
        testId: +props.query.test_id ?? null,
      })),
      contextId: +props.query.test_id ?? null,
    },
  };
};

export default QueryPage;
