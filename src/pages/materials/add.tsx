import { getAddMaterialProps } from "@services/pages/materials";

import { createEditPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Учебные материалы",
  name: "учебный материал",
  action: "/api/materials/add",
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);
    return {
      props: {
        ...props,
        ...(await getAddMaterialProps({
          ...props,
          programId: +props.query.program_id || null,
        }))
      }
    };
  } catch (err) {
    return handleRedirectError(err);
  }

};

export { getServerSideProps };
export default EditPage;
