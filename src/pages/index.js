import Head from "next/head";
import { Header, LinkButton } from "../components";

import styles from "../styles/Home.module.css";

const Main = () => {
  return (
    <>
      <Head>
        <title>Добро пожаловать!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 style={{ fontSize: "5em" }}>Добро пожаловать!</h1>
      </header>
      <LinkButton link="/login/teacher" text="Войти как инструктор" />
      <LinkButton link="/login/student" text="Войти как студент" />
      <LinkButton link="/signup" text="Зарегистрироваться как инструктор" />
    </>
  );
};

const getServerSideProps = ({ query, req }) => {
  return {
    props: {},
  };
};

export { getServerSideProps };

export default Main;
