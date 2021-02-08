import React from "react";
import Layout from "../components/Layout";
import ShortenUrl from "../components/ShortenUrl";
import style from "../styles/SavedLinks.module.scss";
import { useContext } from "react";
import { FirebaseContext } from "../logic/context";

function SavedLinks() {
  const { savedUrls } = useContext(FirebaseContext);
  return (
    <Layout>
      <div className={style.container}>
        <h1>Your saved links</h1>

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
      </div>
    </Layout>
  );
}

export default SavedLinks;
