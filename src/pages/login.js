import Head from "next/head";

import { Form } from "../components";
import { getLoginProps } from "../services/pages/login";

const Login = ({ columns, isInvalid }) => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      {isInvalid && <div>Invalid credentials</div>}
      <Form name="Login" action="/api/login" columns={columns} />
    </>
  );
};

const getServerSideProps = ({ query }) => {
  console.log(query);
  return {
    props: getLoginProps({ isInvalid: !!query.invalid }),
  };
};

export { getServerSideProps };
export default Login;
