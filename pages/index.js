import Layout from "../components/Layout";
import style from "../styles/Home.module.scss";
import Link from "next/link";
import UrlShortener from "../components/UrlShortener";
import ShortenUrl from "../components/ShortenUrl";
import axios from "axios";
import { useContext, useState } from "react";
import { FirebaseContext } from "../logic/context";
import { BackendContext } from "../logic/backendContext";

const Home = () => {
  // context data
  const { savedUrls } = useContext(FirebaseContext);
  const { urls } = useContext(BackendContext);

  //state
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");

  //Handle post request to backend
  async function postLongUrl(url) {
    const response = await axios.post("http://localhost:5000/api/url/shorten", {
      longUrl: url,
    });
    const { shortUrl, longUrl } = response.data;
    setShortUrl(shortUrl);
    setLongUrl(longUrl);
  }
  return (
    <Layout pageTitle="Home">
      <>
        <div className={style.container}>
          <div className={style.copy_right}>
            <h1>More then just shorter links</h1>
            <p>
              Build your brand's recognition and get detailed insights on how
              your links are performing.
            </p>
            <div className={style.btn}>
              <Link href="#start">Get Started</Link>
            </div>
          </div>
          <div className={style.img}>
            <img
              src="/images/illustration-working.svg"
              alt="illustration-working"
            />
          </div>
        </div>

        <section className={style.main} id="start">
          <UrlShortener handlePost={postLongUrl} />
          {urls && (
            <ShortenUrl longUrl={urls.longUrl} shortUrl={urls.shortUrl} />
          )}

          {savedUrls &&
            savedUrls.docs.map((doc) => {
              return (
                <ShortenUrl
                  key={doc.id}
                  longUrl={doc.data().longUrl}
                  shortUrl={doc.data().shortUrl}
                />
              );
            })}
        </section>
      </>
    </Layout>
  );
};

export default Home;
