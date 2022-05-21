import getAddPointProps from "@services/pages/points/getAddPointProps";

import { createEditPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Пункты учебной программы",
  name: "пункт",
  action: (id) => `/api/points/edit/${id}`,
  isEdit: true,
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
