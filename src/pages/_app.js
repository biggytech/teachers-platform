// import '../styles/globals.css'
import "tailwindcss/tailwind.css";
// import { Header } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
