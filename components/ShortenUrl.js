import style from "../styles/ShortenUrl.module.scss";
import { useState } from "react";

function ShortenUrl({ longUrl, shortUrl }) {
  // Changing copy button background
  const [copy, setCopy] = useState(style.copy);
  const [copyTitle, setCopyTitle] = useState("Copy");

  //handle copy link functionality
  async function copyLink() {
    setCopy(style.copied);
    setCopyTitle("Copied");
  }
  return (
    <>
      {longUrl && shortUrl ? (
        <div className={style.container}>
          <div className={style.long_url}>
            <p>{longUrl}</p>
          </div>
          <div className={style.shorten_url}>
            <p>
              <a href={shortUrl} target="blank">
                {shortUrl}
              </a>
            </p>
            <button className={copy} onClick={copyLink}>
              {copyTitle}
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default ShortenUrl;
