import FirebaseContextProvider from "../logic/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseContextProvider>
      <Component {...pageProps} />
    </FirebaseContextProvider>
  );
}

export default MyApp;
