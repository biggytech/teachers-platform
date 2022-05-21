import { createEditPage } from "@components/pages";
import handleRedirectError from "@services/pages/handleRedirectError";
import getAddQuestionProps from "@services/pages/questions/getAddQuestionProps";
import { ROLES } from "@projectTypes/user";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Вопрос",
  name: "вопрос",
  action: "/api/questions/add",
  accessRole: ROLES.TEACHER
});

export const getServerSideProps = async ({ query, req, res }) => {
  try {
    const props = await runGetServerSideProps({ req, res, query });

    return {
      props: {
        ...props
      ...(await getAddQuestionProps({
          testId: +props.query.test_id ?? null,
        })),
      },
    };
  } catch (err) {
    return handleRedirectError(err);
  }

};

export default EditPage;
