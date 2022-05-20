import Head from "next/head";
import { LinkButton } from "../components";

import styles from "../styles/Home.module.css";

const Main = () => {
  return (
    <div
      style={{
        padding: "2em",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flex: 1,
        flexGrow: 1,
        paddingBottom: 0,
      }}
    >
      <Head>
        <title>Онлайн обучение | Добро пожаловать!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 style={{ fontSize: "5em" }}>Система онлайн обучения</h1>
        <div>
          <img
            src="/images/logo.png"
            style={{ width: "100px", float: "left" }}
          />
          <h2 style={{ fontSize: "3em" }}>Добро пожаловать!</h2>
        </div>
      </header>

      <div style={{ marginTop: "1em" }}>
        <LinkButton link="/login/teacher" text="Войти как инструктор" />
        <LinkButton link="/login/student" text="Войти как студент" />
        <LinkButton link="/signup" text="Зарегистрироваться как инструктор" />
      </div>

      <p style={{ marginTop: "5em" }}>
        *Примечание: если вы студент и не зарегистрированы в системе, обратитесь
        к вашему инструктору для регистрации.
      </p>

      <footer
        style={{
          margin: 0,
          marginTop: "auto",
          background: "#eeeeee",
          padding: "1em",
        }}
      >
        Разработано Гарбузова Н.С., 2022
      </footer>
    </div>
  );
};

const getServerSideProps = ({ query, req }) => {
  return {
    props: {},
  };
};

export { getServerSideProps };

export default Main;
