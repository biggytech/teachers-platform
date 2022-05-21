import { getAddProgramProps } from "@services/pages/programs";

import { createEditPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Учебные программы",
  name: "учебную программу",
  action: "/api/programs/add",
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);
    return {
      props: {
        ...props,
        ...(await getAddProgramProps({
          ...props,
          ownerId: props.userId,
          id: props.id ?? null
        }))
      },
    };
  } catch (err) {
    return handleRedirectError(err);
  }

};

export { getServerSideProps };
export default EditPage;
