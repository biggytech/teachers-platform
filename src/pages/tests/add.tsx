import { getAddTestProps } from "@services/pages/tests";

import { createEditPage } from "@components/pages";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Тесты",
  name: "тест",
  action: "/api/tests/add",
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: await getAddTestProps({
      ...props,
      pointId: +props.query.point_id || null,
    }),
  };
};

export { getServerSideProps };
export default EditPage;
