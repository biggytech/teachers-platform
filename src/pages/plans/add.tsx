import { getAddPlanProps } from "@services/pages/plans";

import { createEditPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Учебные планы",
  name: "учебный план",
  action: "/api/plans/add",
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);
    return {
      props: {
        user: props.user,
        ...(await getAddPlanProps({
          ...props,
          studentId: +props.query.student_id || null,
          user: props.user
        }))
      },
    };
  } catch (err) {
    return handleRedirectError(err);
  }

};

export { getServerSideProps };
export default EditPage;
