import { getPlansProps } from "@services/pages/plans";

import { createQueryPage } from "@components/pages";
import { ROLES } from "@types/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Учебные планы",
  addLink: (contextId) => `/plans/add?student_id=${contextId}`,
  isUsePagination: false,
  pathName: "/plans",
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);
    return {
      props: {
        ...props,
        ...(await getPlansProps({
          ...props,
          studentId: +props.query.student_id || null,
        })),
        contextId: props.query.student_id || null,
      },
    };
  } catch (error) {
    return handleRedirectError(error)
  }

};

export { getServerSideProps };
export default QueryPage;
