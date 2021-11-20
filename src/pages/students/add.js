import Head from "next/head";

import { Form, Header } from "../../components";
import { getAddStudentProps } from "../../services/pages/students";
import { checkAuthentication } from "../../services/pages";

const AddStudent = ({ columns }) => {
  return (
    <>
      <Head>
        <title>Students | Add</title>
      </Head>
      <Header />
      <Form
        name="Add a student"
        encType="multipart/form-data"
        action="/api/students/add"
        columns={columns}
      />
    </>
  );
};

const getServerSideProps = async ({ req }) => {
  return await checkAuthentication({
    req,
    cb: () => {
      return {
        props: getAddStudentProps(),
      };
    },
  });
};

export { getServerSideProps };
export default AddStudent;
