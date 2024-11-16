import { db } from "@/config/firebase";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";

async function addNewUser(
  uid: string,
  username: string,
  email: string
): Promise<void> {
  await setDoc(doc(collection(db, "users"), uid), {
    uid,
    username,
    email,
  });
}

async function getUserByUsername(
  username: string
): Promise<QuerySnapshot<DocumentData, DocumentData>> {
  const usersCollectionRef = collection(db, "users");

  const usernameQuery = query(
    usersCollectionRef,
    where("username", "==", username)
  );

  return await getDocs(usernameQuery);
}

async function getUserByEmail(
  email: string
): Promise<QuerySnapshot<DocumentData, DocumentData>> {
  const usersCollectionRef = collection(db, "users");

  const emailQuery = query(usersCollectionRef, where("email", "==", email));

  return await getDocs(emailQuery);
}

const firestoreClient = {
  addNewUser,
  getUserByUsername,
  getUserByEmail,
};

export default firestoreClient;
