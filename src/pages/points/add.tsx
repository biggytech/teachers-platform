import { getAddPointProps } from "@services/pages/points";

import { createEditPage } from "@components/pages";
import { ROLES } from "@types/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Пункты учебной программы",
  name: "пункт",
  action: "/api/points/add",
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);
    return {
      props: {
        ...props,
        ...(await getAddPointProps({
          ...props,
          programId: +props.query.program_id || null,
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
