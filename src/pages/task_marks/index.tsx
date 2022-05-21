import { createQueryPage } from "@components/pages";
import handleRedirectError from "@services/pages/handleRedirectError";
import { getTaskMarksProps } from "@services/pages/task_marks/getTaskMarksProps";
import { ROLES } from "@types/user";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Оценки по практическим заданиям",
  addLink: (contextId) =>
    `/task_marks/add?plan_id=${contextId[0]}&point_id=${contextId[1]}`,
  isUsePagination: false,
  accessRole: ROLES.TEACHER
});

export const getServerSideProps = async ({ req, query }) => {
  try {
    const props = await runGetServerSideProps({ query, req });
    return {
      props: {
        ...props,
        ...(await getTaskMarksProps({
          planId: +query.plan_id || null,
        })),
        contextId: [+query.plan_id || null, +query.point_id || null],
      },
    };
  } catch (error) {
    return handleRedirectError(error)
  }

};

export default QueryPage;
