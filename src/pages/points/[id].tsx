import { getSinglePointProps } from "@services/pages/points";

import { createSinglePage } from "@components/pages";

const { runGetServerSideProps, SinglePage } = createSinglePage({
  links: [
    {
      link: (contextId) => `/tasks?point_id=${contextId}`,
      text: "Практические задания пункта программы",
    },
    {
      link: (contextId) => `/tests?point_id=${contextId}`,
      text: "Тесты пункта программы",
    },
  ],
  isEditable: true,
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: await getSinglePointProps({
      ...props,
      id: +data.params.id,
    }),
  };
};

export { getServerSideProps };
export default SinglePage;
