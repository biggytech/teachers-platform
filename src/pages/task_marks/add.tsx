import { createEditPage } from "@components/pages";
import handleRedirectError from "@services/pages/handleRedirectError";
import { getAddTaskMarkProps } from "@services/pages/task_marks/getAddTaskMarkProps";
import { ROLES } from "@projectTypes/user";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Оценки по практическим заданиям",
  name: "оценку по практическому заданию",
  action: "/api/task_marks/add",
  accessRole: ROLES.TEACHER
});

export const getServerSideProps = async ({ req, res, query }) => {
  try {
    const { user } = await runGetServerSideProps({ query, req, res });
    return {
      props: {
        user: user,
        ...(await getAddTaskMarkProps({
          planId: +query.plan_id ?? null,
          pointId: +query.point_id ?? null,
        })),
      },
    };
  } catch (err) {
    return handleRedirectError(err);
  }

};

export default EditPage;
