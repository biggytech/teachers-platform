import { getAddProgramProps } from "@services/pages/programs";

import { createEditPage } from "@components/pages";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Учебные программы",
  name: "учебную программу",
  action: "/api/programs/add",
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: {
      ...props,
      ...(await getAddProgramProps({
        ...props,
        ownerId: props.userId,
        id: props.id ?? null
      }))
    },
  };
};

export { getServerSideProps };
export default EditPage;
