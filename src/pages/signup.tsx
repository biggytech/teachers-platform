import Head from "next/head";

import { Form } from "../components";
import { getSignUpProps } from "../services/pages/signup";

const SignUp = ({ columns }) => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Form name="Sign Up | Teacher" action="/api/signup" columns={columns} />
    </>
  );
};

const getServerSideProps = ({ query }) => {
  console.log(query);
  return {
    props: getSignUpProps({}),
  };
};

export { getServerSideProps };
export default SignUp;
