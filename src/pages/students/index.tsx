import { getStudentsProps } from "../../services/pages/students";
import { createQueryPage } from "@components/pages";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Студенты",
  addLink: "/students/add",
  pathName: "/students",
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: getStudentsProps({
      ...props,
      teacherId: props.userId,
    }),
  };
};

export { getServerSideProps };
export default QueryPage;
