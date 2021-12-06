import { getMaterialsProps } from "@services/pages/materials";
import { createQueryPage } from "@components/pages";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Учебные материалы",
  addLink: (contextId) => `/materials/add?program_id=${contextId}`,
  isUsePagination: false,
  onClick: (row) => row.link,
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: {
      ...(await getMaterialsProps({
        ...props,
        program_id: props.query.program_id || null,
      })),
      contextId: props.query.program_id || null,
    },
  };
};

export { getServerSideProps };
export default QueryPage;
