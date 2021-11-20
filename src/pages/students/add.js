import Head from "next/head";

import { Form } from "../../components";
import { getAddStudentProps } from "../../services/pages/students";

const AddStudent = ({ columns }) => {
  return (
    <>
      <Head>
        <title>Students | Add</title>
      </Head>
      <Form name="Add a student" action="/api/students/add" columns={columns} />
    </>
  );
};

const getServerSideProps = ({ query }) => {
  return {
    props: getAddStudentProps(),
  };
};

export { getServerSideProps };
export default AddStudent;
