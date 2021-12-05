import { getAddPointProps } from "@services/pages/points";

import { createEditPage } from "@components/pages";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Points",
  name: "point",
  action: "/api/points/add",
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: await getAddPointProps({
      ...props,
      programId: +props.query.program_id || null,
    }),
  };
};

export { getServerSideProps };
export default EditPage;
