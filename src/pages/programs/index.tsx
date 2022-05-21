import { getProgramsProps } from "@services/pages/programs";

import { createQueryPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Учебные программы",
  addLink: "/programs/add",
  pathName: "/programs",
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);
    return {
      props: {
        ...props,
        ...(await getProgramsProps({
          ...props,
          ownerId: props.userId,
        }))
      },
    };
  } catch (error) {
    return handleRedirectError(error)
  }

};

export { getServerSideProps };
export default QueryPage;
