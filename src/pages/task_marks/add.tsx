import { createEditPage } from "@components/pages";
import { getAddTaskMarkProps } from "@services/pages/task_marks/getAddTaskMarkProps";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Оценки по практическим заданиям",
  name: "оценку по практическому заданию",
  action: "/api/task_marks/add",
});

export const getServerSideProps = async ({ req, res, query }) => {
  await runGetServerSideProps({ query, req, res });
  return {
    props: {
      ...props,
      ...(await getAddTaskMarkProps({
        planId: +query.plan_id ?? null,
        pointId: +query.point_id ?? null,
      })),
    },
  };
};

export default EditPage;
