import { getAddProgramProps } from "@services/pages/programs";

import { createEditPage } from "@components/pages";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Учебные программы",
  name: "учебную программу",
  action: (id) => `/api/programs/edit/${id}`,
  isEdit: true,
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);

  // console.log("PROPS:", props);

  return {
    props: await getAddProgramProps({
      ...props,
      ownerId: props.userId,
      isEdit: true,
    }),
  };
};

export { getServerSideProps };
export default EditPage;
