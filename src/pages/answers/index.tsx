import { createQueryPage } from "@components/pages";
import getAnswersProps from "@services/pages/answers/getAnswersProps";
import handleRedirectError from "@services/pages/handleRedirectError";
import { ROLES } from "@projectTypes/user";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Ответы на вопросы тестов",
  addLink: (contextId) => `/answers/add?question_id=${contextId}`,
  isUsePagination: false,
  accessRole: ROLES.TEACHER
});

export const getServerSideProps = async ({ query, req }) => {
  try {
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
  } catch (error) {
    return handleRedirectError(error)
  }

};

export default QueryPage;
