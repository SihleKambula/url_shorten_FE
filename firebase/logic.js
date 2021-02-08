import { firebaseAuth, firestoreDB } from "./config";

async function getData() {
  const result = await firestoreDB.collection("testing").get();
  return result;
}

export { getData };
