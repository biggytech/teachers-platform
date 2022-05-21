import { getPointsByPlansProps } from "@services/pages/points/getPointsByPlansProps";

import { createQueryPage } from "@components/pages";
import { ROLES } from "@types/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Пункты учебной программы (план)",
  isUsePagination: false,
  pathName: "/points/by_plans",
  queryParams: (contextId) => `?plan_id=${contextId}`,
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
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
  } catch (error) {
    return handleRedirectError(error)
  }

};

export { getServerSideProps };
export default QueryPage;
