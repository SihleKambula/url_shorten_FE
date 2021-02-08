import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { auth, firestoreDB } from "../firebase/config";

// ------------------FIREBASE CONTEXT-------------------//

export const FirebaseContext = createContext();

const FirebaseContextProvider = (props) => {
  const [userStatus, setUserStatus] = useState(null);

  // listen for user's auth change
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUserStatus(user);
    } else {
      setUserStatus(null);
    }
  });

  // create user with email and password
  async function registerUser(email, password, displayName) {
    try {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName });
      return cred.user;
    } catch (error) {
      return error.message;
    }
  }

  // sign in user with email and password
  async function signUserIn(email, password) {
    try {
      const cred = await auth.signInWithEmailAndPassword(email, password);
      return cred.user;
    } catch (error) {
      return error;
    }
  }

  // sign user out
  async function signUserOut() {
    try {
      await auth.signOut();
    } catch (error) {
      return error.message;
    }
  }
  //-----------FIRESTORE---------------//

  // get saved urls for firebase firestore

  const [savedUrls, setSavedUrls] = useState(null);

  useEffect(() => {
    if (userStatus) {
      getData().then((result) => {
        setSavedUrls(result);
      });
    }
    setSavedUrls(null);
  }, [userStatus]);

  // get urls
  async function getData() {
    const result = await firestoreDB.collection("urls").get();
    return result;
  }

  // context provider
  return (
    <FirebaseContext.Provider
      value={{
        registerUser,
        signUserIn,
        userStatus,
        signUserOut,
        getData,
        savedUrls,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

// ----------------BACKEND LOGIC------------------//

// const [shortUrl, setShortUrl] = useState("");
// const [longUrl, setLongUrl] = useState("");

// //Handle post request to backend
// async function postLongUrl(url) {
//   const response = await axios.post("http://localhost:5000/api/url/shorten", {
//     longUrl: url,
//   });
//   const { shortUrl, longUrl } = response.data;
//   setShortUrl(shortUrl);
//   setLongUrl(longUrl);
// }

export default FirebaseContextProvider;
