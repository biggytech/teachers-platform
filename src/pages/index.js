import Link from "next/link";
import Head from "next/head";

import styles from "../styles/Home.module.css";

const Main = () => {
  return (
    <>
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

export default Main;
