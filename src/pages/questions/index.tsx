import { createQueryPage } from "@components/pages";
import handleRedirectError from "@services/pages/handleRedirectError";
import getQuestionsProps from "@services/pages/questions/getQuestionsProps";
import { ROLES } from "@projectTypes/user";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Вопросы",
  addLink: (contextId) => `/questions/add?test_id=${contextId}`,
  isUsePagination: false,
  pathName: "/questions",
  accessRole: ROLES.TEACHER
});

export const getServerSideProps = async ({ query, req }) => {
  try {
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
  } catch (error) {
    return handleRedirectError(error)
  }

};

export default QueryPage;
