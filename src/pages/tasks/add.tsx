import { getAddTaskProps } from "@services/pages/tasks";

import { createEditPage } from "@components/pages";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Практические задания",
  name: "практическое задание",
  action: "/api/tasks/add",
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: {
      ...props,
      ...(await getAddTaskProps({
        ...props,
        pointId: +props.query.point_id || null,
      }))
    },
  };
};

export { getServerSideProps };
export default EditPage;
