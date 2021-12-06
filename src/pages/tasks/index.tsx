import { getTasksProps } from "@services/pages/tasks";

import { createQueryPage } from "@components/pages";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Практические задания",
  addLink: (contextId) => `/tasks/add?point_id=${contextId}`,
  isUsePagination: false,
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: {
      ...(await getTasksProps({
        ...props,
        pointId: props.query.point_id || null,
      })),
      contextId: props.query.point_id || null,
    },
  };
};

export { getServerSideProps };
export default QueryPage;
