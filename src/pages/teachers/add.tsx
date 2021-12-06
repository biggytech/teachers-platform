import Head from "next/head";

import { Form, Header } from "@components";
import { getAddTeacherProps } from "@services/pages/teachers";
import { checkAuthentication } from "@services/pages";

const AddTeacher = ({ columns }) => {
  return (
    <>
      <Header />
      <Head>
        <title>Инструкторы | Добавить</title>
      </Head>
      <Form
        name="Добавить инструктора"
        encType="multipart/form-data"
        action="/api/teachers/add"
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
        props: getAddTeacherProps(),
      };
    },
  });
};

export { getServerSideProps };
export default AddTeacher;
