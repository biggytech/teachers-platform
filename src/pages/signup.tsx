import Head from "next/head";

import { Form } from "@components";
import { getSignUpProps } from "@services/pages/signup";

const SignUp = ({ columns }) => {
  return (
    <>
      <Head>
        <title>Зарегистрироваться</title>
      </Head>
      <Form
        name="Зарегистрироваться | Инструктор"
        action="/api/signup"
        columns={columns}
      />
    </>
  );
};

const getServerSideProps = ({ query }) => {
  return {
    props: getSignUpProps({}),
  };
};

export { getServerSideProps };
export default SignUp;
