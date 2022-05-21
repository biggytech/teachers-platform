import { getPointsProps } from "@services/pages/points";

import { createQueryPage } from "@components/pages";
import { ROLES } from "@types/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Пункты учебной программы",
  addLink: (contextId) => `/points/add?program_id=${contextId}`,
  isUsePagination: false,
  pathName: "/points",
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);
    return {
      props: {
        ...props,
        ...(await getPointsProps({
          ...props,
          program_id: props.query.program_id || null,
        })),
        contextId: props.query.program_id || null,
      },
    };
  } catch (error) {
    return handleRedirectError(error)
  }

};

export { getServerSideProps };
export default QueryPage;
