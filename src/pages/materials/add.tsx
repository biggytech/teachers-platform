import { getAddMaterialProps } from "@services/pages/materials";

import { createEditPage } from "@components/pages";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Учебные материалы",
  name: "учебный материал",
  action: "/api/materials/add",
});

const getServerSideProps = async (data) => {
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
};

export { getServerSideProps };
export default EditPage;
