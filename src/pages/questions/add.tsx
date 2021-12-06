import { createEditPage } from "@components/pages";
import getAddQuestionProps from "@services/pages/questions/getAddQuestionProps";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Вопрос",
  name: "вопрос",
  action: "/api/questions/add",
});

export const getServerSideProps = async ({ query, req, res }) => {
  const props = await runGetServerSideProps({ req, res, query });

  return {
    props: {
      ...(await getAddQuestionProps({
        testId: +props.query.test_id ?? null,
      })),
    },
  };
};

export default EditPage;
