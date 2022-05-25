import { createEditPage } from "@components/pages";
import { getAddAnswersProps } from "@services/pages/answers/getAddAnswersProps";
import handleRedirectError from "@services/pages/handleRedirectError";
import { ROLES } from "@projectTypes/user";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Ответы на вопросы тестов",
  name: "ответ",
  action: "/api/answers/add",
  accessRole: ROLES.TEACHER
});

export const getServerSideProps = async ({ query, req, res }) => {
  try {
    const props = await runGetServerSideProps({ query, req, res });
    return {
      props: {
        user: props.user,
        ...(await getAddAnswersProps({
          questionId: +query.question_id || null,
        })),
      },
    };
  } catch (err) {
    return handleRedirectError(err);
  }

};

export default EditPage;
