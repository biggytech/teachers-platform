import Link from "next/link";
import Head from "next/head";
import { Header, LinkButton } from "../components";

import styles from "../styles/Home.module.css";

const Main = () => {
  return (
    <>
      {/* <Header /> */}
      <Head>
        <title>Welcome!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 style={{ fontSize: "5em" }}>Welcome!</h1>
      </header>
      <LinkButton link="/login/teacher" text="Login as teacher" />
      <LinkButton link="/login/student" text="Login as student" />
      <LinkButton link="/signup" text="Signup as teacher" />
    </>
  );
};

const getServerSideProps = ({ query, req }) => {
  return {
    props: {},
    // redirect: {
    //   destination: "/login",
    //   permanent: false,
    // },
  };
};

export { getServerSideProps };

export default Main;
