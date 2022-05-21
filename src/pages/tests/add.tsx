import { getAddTestProps } from "@services/pages/tests";

import { createEditPage } from "@components/pages";
import { ROLES } from "@types/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Тесты",
  name: "тест",
  action: "/api/tests/add",
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);
    return {
      props: {
        ...props,
        ...(await getAddTestProps({
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
