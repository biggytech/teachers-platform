import { createEditPage } from "@components/pages";
import { getAddTaskMarkProps } from "@services/pages/task_marks/getAddTaskMarkProps";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Task marks",
  name: "task mark",
  action: "/api/task_marks/add",
});

export const getServerSideProps = async ({ req, res, query }) => {
  const props = await runGetServerSideProps({ query, req, res });
  return {
    props: {
      //   ...props,
      ...(await getAddTaskMarkProps({
        planId: +query.plan_id ?? null,
        pointId: +query.point_id ?? null,
      })),
    },
  };
};

export default EditPage;
