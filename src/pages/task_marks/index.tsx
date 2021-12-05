import { createQueryPage } from "@components/pages";
import { getTaskMarksProps } from "@services/pages/task_marks/getTaskMarksProps";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Task marks",
  addLink: (contextId) =>
    `/task_marks/add?plan_id=${contextId[0]}&point_id=${contextId[1]}`,
  isUsePagination: false,
});

export const getServerSideProps = async ({ req, query }) => {
  const props = await runGetServerSideProps({ query, req });
  return {
    props: {
      ...props,
      ...(await getTaskMarksProps({
        planId: +query.plan_id || null,
        // pointId: +query.point_id || null,
      })),
      contextId: [+query.plan_id || null, +query.point_id || null],
    },
  };
};

export default QueryPage;
