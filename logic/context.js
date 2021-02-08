// The main logic of the app
// Gonna use useContext and useReducer to control
// the state of the app

import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { irebaseAuth, firestoreDB } from "../firebase/config";

// auth state
const [isLoggedIn, setIsLoggedIn] = useState();

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
