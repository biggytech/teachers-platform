import Link from "next/link";
import Head from "next/head";
import { Header } from "../components";

import styles from "../styles/Home.module.css";

const Main = () => {
  return (
    <>
      <Header />
      <Head>
        <title>Main page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Main page</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link href="/students">
              <a>Students</a>
            </Link>
          </li>
        </ul>
      </nav>
      <main></main>
    </>
  );
};

const getServerSideProps = ({ query, req }) => {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

export { getServerSideProps };

export default Main;
