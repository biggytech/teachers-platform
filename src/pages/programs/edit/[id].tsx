import { getAddProgramProps } from "@services/pages/programs";

import { createEditPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Учебные программы",
  name: "учебную программу",
  action: (id) => `/api/programs/edit/${id}`,
  isEdit: true,
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);

    return {
      props: {
        user: props.user,
        ...(await getAddProgramProps({
          ...props,
          ownerId: props.userId,
          isEdit: true,
        }))
      },
    };
  } catch (err) {
    return handleRedirectError(err);
  }

};

export { getServerSideProps };
export default EditPage;
