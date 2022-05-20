import { getPointsByPlansProps } from "@services/pages/points/getPointsByPlansProps";

import { createQueryPage } from "@components/pages";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Пункты учебной программы (план)",
  isUsePagination: false,
  pathName: "/points/by_plans",
  queryParams: (contextId) => `?plan_id=${contextId}`,
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: {
      ...props,
      ...(await getPointsByPlansProps({
        ...props,
        planId: props.query.plan_id || null,
      })),
      contextId: props.query.plan_id || null,
    },
  };
};

export { getServerSideProps };
export default QueryPage;
