import { getTasksProps } from "@services/pages/tasks";

import { createQueryPage } from "@components/pages";
import { ROLES } from "@types/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Практические задания",
  addLink: (contextId) => `/tasks/add?point_id=${contextId}`,
  isUsePagination: false,
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
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
  } catch (error) {
    return handleRedirectError(error)
  }

};

export { getServerSideProps };
export default QueryPage;
