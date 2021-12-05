import { getTestsProps } from "@services/pages/tests";

import { createQueryPage } from "@components/pages";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Tests",
  addLink: (contextId) => `/tests/add?point_id=${contextId}`,
  pathName: "/tests",
  isUsePagination: false,
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: {
      ...(await getTestsProps({
        ...props,
        pointId: props.query.point_id || null,
      })),
      contextId: props.query.point_id || null,
    },
  };
};

export { getServerSideProps };
export default QueryPage;
