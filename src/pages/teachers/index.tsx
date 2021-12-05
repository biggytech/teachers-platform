import { getTeachersProps } from "@services/pages/teachers";
import { createQueryPage } from "@components/pages";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Teachers",
  addLink: "/teachers/add",
  pathName: "/teachers",
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: await getTeachersProps(props),
  };
};

export { getServerSideProps };
export default QueryPage;