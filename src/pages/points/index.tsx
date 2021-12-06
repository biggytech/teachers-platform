import { getPointsProps } from "@services/pages/points";

import { createQueryPage } from "@components/pages";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Пункты учебной программы",
  addLink: (contextId) => `/points/add?program_id=${contextId}`,
  isUsePagination: false,
  pathName: "/points",
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: {
      ...(await getPointsProps({
        ...props,
        program_id: props.query.program_id || null,
      })),
      contextId: props.query.program_id || null,
    },
  };
};

export { getServerSideProps };
export default QueryPage;
