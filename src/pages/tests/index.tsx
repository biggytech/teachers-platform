import { getTestsProps } from "@services/pages/tests";

import { createQueryPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Тесты",
  addLink: (contextId) => `/tests/add?point_id=${contextId}`,
  pathName: "/tests",
  isUsePagination: false,
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);
    return {
      props: {
        ...props,
        ...(await getTestsProps({
          ...props,
          pointId: props.query.point_id || null,
        })),
        contextId: props.query.point_id || null,
      },
    };
  } catch (error) {
    return handleRedirectError(error)
  }

};

export { getServerSideProps };
export default QueryPage;
