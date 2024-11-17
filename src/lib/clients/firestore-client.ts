import { db } from "@/config/firebase";
import { Repository, SortOptionsMap, TopicItem } from "@/types";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { handleError } from "../utils";
import appConstants from "../constants";

async function addNewUser(
  uid: string,
  username: string,
  email: string
): Promise<void> {
  await setDoc(doc(collection(db, "users"), uid), {
    uid,
    username,
    email,
    bookmarks: [],
    topics: appConstants.initialTopics,
    sortOptions: {},
  });
}

async function getUserByUID(uid: string): Promise<DocumentData | null> {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by uid: ", error);
    return null;
  }
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

async function setUserBookmarks(
  uid: string,
  bookmarks: Repository[]
): Promise<void> {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
      bookmarks,
    });
  } catch (error) {
    console.error("Error updating user bookmarks: ", error);
    handleError("Error updating user bookmarks.");
  }
}

async function setUserTopics(uid: string, topics: TopicItem[]): Promise<void> {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
      topics,
    });
  } catch (error) {
    console.error("Error updating user topics: ", error);
    handleError("Error updating user topics.");
  }
}

async function setUserSortOptions(
  uid: string,
  sortOptions: SortOptionsMap
): Promise<void> {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
      sortOptions,
    });
  } catch (error) {
    console.error("Error updating user sortOptions: ", error);
    handleError("Error updating user sortOptions.");
  }
}

const firestoreClient = {
  addNewUser,
  getUserByUID,
  getUserByUsername,
  getUserByEmail,
  setUserBookmarks,
  setUserTopics,
  setUserSortOptions,
};

export default firestoreClient;
