import { getStudentsProps } from "../../services/pages/students";
import { createQueryPage } from "@components/pages";
import { ROLES } from "@types/user";
import logger from "@logger";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Студенты",
  addLink: "/students/add",
  pathName: "/students",
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);
    return {
      props: getStudentsProps({
        ...props,
        teacherId: props.userId,
      }),
    };
  } catch (error) {
    return handleRedirectError(error)
  }
};

export { getServerSideProps };
export default QueryPage;
