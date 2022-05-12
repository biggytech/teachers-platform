import getAddPointProps from "@services/pages/points/getAddPointProps";

import { createEditPage } from "@components/pages";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Пункты учебной программы",
  name: "пункт",
  action: (id) => `/api/points/edit/${id}`,
  isEdit: true,
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: await getAddPointProps({
      ...props,
      programId: +props.query.program_id || null,
      isEdit: true,
    }),
  };
};

export { getServerSideProps };
export default EditPage;
