import { getAddPlanProps } from "@services/pages/plans";

import { createEditPage } from "@components/pages";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Plans",
  name: "plan",
  action: "/api/plans/add",
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: await getAddPlanProps({
      ...props,
      studentId: +props.query.student_id || null,
    }),
  };
};

export { getServerSideProps };
export default EditPage;
