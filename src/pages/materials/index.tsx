import { getMaterialsProps } from "@services/pages/materials";
import { createQueryPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Учебные материалы",
  addLink: (contextId) => `/materials/add?program_id=${contextId}`,
  isUsePagination: false,
  onClick: (row) => row.link,
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);
    return {
      props: {
        ...props,
        ...(await getMaterialsProps({
          ...props,
          program_id: props.query.program_id || null,
        })),
        contextId: props.query.program_id || null,
      },
    };
  } catch (error) {
    return handleRedirectError(error)
  }

};

export { getServerSideProps };
export default QueryPage;
