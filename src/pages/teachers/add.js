import Head from "next/head";

import { Form } from "../../components";
import { getAddTeacherProps } from "../../services/pages/teachers";

const AddTeacher = ({ columns }) => {
  return (
    <>
      <Head>
        <title>Teachers | Add</title>
      </Head>
      <Form name="Add a teacher" action="/api/teachers/add" columns={columns} />
    </>
  );
};

const getServerSideProps = ({ query }) => {
  return {
    props: getAddTeacherProps(),
  };
};

export { getServerSideProps };
export default AddTeacher;
