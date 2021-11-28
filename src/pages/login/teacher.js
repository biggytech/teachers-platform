import Head from "next/head";

import { Form } from "../../components";
import { getTeacherLoginProps } from "../../services/pages/login";

const Login = ({ columns, isInvalid }) => {
  return (
    <>
      <Head>
        <title>Login | Teacher</title>
      </Head>
      {isInvalid && <div>Invalid credentials</div>}
      <Form
        name="Login | Teacher"
        action="/api/login/teacher"
        columns={columns}
      />
    </>
  );
};

const getServerSideProps = ({ query }) => {
  console.log(query);
  return {
    props: getTeacherLoginProps({ isInvalid: !!query.invalid }),
  };
};

export { getServerSideProps };
export default Login;
