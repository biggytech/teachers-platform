import { getAddTaskProps } from "@services/pages/tasks";

import { createEditPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Практические задания",
  name: "практическое задание",
  action: "/api/tasks/add",
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);
    return {
      props: {
        user: props.user,
        ...(await getAddTaskProps({
          ...props,
          pointId: +props.query.point_id || null,
        }))
      },
    };
  } catch (err) {
    return handleRedirectError(err);
  }

};

export { getServerSideProps };
export default EditPage;
