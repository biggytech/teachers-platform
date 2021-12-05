import { getPlansProps } from "@services/pages/plans";

import { createQueryPage } from "@components/pages";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Plans",
  addLink: (contextId) => `/plans/add?student_id=${contextId}`,
  isUsePagination: false,
  pathName: "/plans",
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: {
      ...(await getPlansProps({
        ...props,
        studentId: +props.query.student_id || null,
      })),
      contextId: props.query.student_id || null,
    },
  };
};

export { getServerSideProps };
export default QueryPage;
