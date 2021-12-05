import { createEditPage } from "@components/pages";
import getAddQuestionProps from "@services/pages/questions/getAddQuestionProps";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Question",
  name: "question",
  action: "/api/questions/add",
});

export const getServerSideProps = async ({ query, req, res }) => {
  const props = await runGetServerSideProps({ req, res, query });
  console.log("props.query.test_id", props.query.test_id);
  return {
    props: {
      //   ...props,
      ...(await getAddQuestionProps({
        // ...props,
        testId: +props.query.test_id ?? null,
      })),
    },
  };
};

export default EditPage;
