import Head from "next/head";

import { Form } from "../../components";
import { getTeacherLoginProps } from "../../services/pages/login";

const Login = ({ columns, isInvalid }) => {
  return (
    <>
      <Head>
        <title>Войти | Инструктор</title>
      </Head>
      {isInvalid && <div>Неверные данные</div>}
      <Form
        name="Войти | Инструктор"
        action="/api/login/teacher"
        columns={columns}
      />
    </>
  );
};

const getServerSideProps = ({ query }) => {
  return {
    props: getTeacherLoginProps({ isInvalid: !!query.invalid }),
  };
};

export { getServerSideProps };
export default Login;
