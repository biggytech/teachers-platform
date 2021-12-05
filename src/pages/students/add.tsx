import { getAddStudentProps } from "@services/pages/students";

import { createEditPage } from "@components/pages";

const { runGetServerSideProps, EditPage } = createEditPage({
  title: "Students",
  name: "student",
  action: "/api/students/add",
  encType: "multipart/form-data",
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  return {
    props: await getAddStudentProps(),
  };
};

export { getServerSideProps };
export default EditPage;
