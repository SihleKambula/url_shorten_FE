import style from "../styles/UrlShortener.module.scss";
import { useState } from "react";

const UrlShortener = ({ handlePost }) => {
  //show border upon error
  const [errorBorder, setErrorBorder] = useState(style.no_error);

  //Dymainc show of error message
  const [isError, setIsError] = useState(null);

  const [urlLink, setUrlLink] = useState("");

  // Handle link submition
  async function handleClick() {
    if (!urlLink) {
      setErrorBorder(style.error);
      setIsError(style.error_message);
    } else {
      handlePost(urlLink);
      setErrorBorder(style.no_error);
      setIsError(null);
      setUrlLink("");
    }
  }
  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="Shorten a link here...."
        className={errorBorder}
        value={urlLink}
        onChange={(e) => setUrlLink(e.target.value)}
      />
      <button onClick={handleClick}>Shorten It!</button>
      {isError && <div className={style.error_message}>Please add a link</div>}
    </div>
  );
};

export default UrlShortener;
