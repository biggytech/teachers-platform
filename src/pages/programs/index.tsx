import { getProgramsProps } from "@services/pages/programs";

import { createQueryPage } from "@components/pages";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Учебные программы",
  addLink: "/programs/add",
  pathName: "/programs",
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: {
      ...props,
      ...(await getProgramsProps({
        ...props,
        ownerId: props.userId,
      }))
    },
  };
};

export { getServerSideProps };
export default QueryPage;
