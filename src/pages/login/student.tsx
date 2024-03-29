import Head from "next/head";

import { Form } from "@components";
import { getStudentLoginProps } from "@services/pages/login";

const Login = ({ columns, isInvalid }) => {
  return (
    <>
      <Head>
        <title>Login | Student</title>
      </Head>
      {isInvalid && <div>Invalid credentials</div>}
      <Form
        name="Войти | Студент"
        action="/api/login/student"
        columns={columns}
      />
    </>
  );
};

const getServerSideProps = ({ query }) => {
  return {
    props: getStudentLoginProps({ isInvalid: !!query.invalid }),
  };
};

export { getServerSideProps };
export default Login;
