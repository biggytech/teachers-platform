import { getAddProgramProps } from "@services/pages/programs";

import { createEditPage } from "@components/pages";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Programs",
  name: "program",
  action: "/api/programs/add",
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: await getAddProgramProps({
      ...props,
      ownerId: props.userId,
    }),
  };
};

export { getServerSideProps };
export default EditPage;
