import { useState, useEffect, createContext } from "react";
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
      getData().then((result) => setSavedUrls(result));
    }
    setSavedUrls(null);
  }, [userStatus]);

  // get saved urls from firebase based on users uid
  async function getData() {
    const result = await firestoreDB
      .collection("urls")
      .where("id", "==", userStatus.uid)
      .get();

    return result;
  }

  // save urls to DB based on users uid
  async function saveUrls(longUrl, shortUrl) {
    const result = await firestoreDB.collection("urls").add({
      longUrl,
      shortUrl,
      id: userStatus.uid,
    });
    // console.log(result);
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

export default FirebaseContextProvider;
