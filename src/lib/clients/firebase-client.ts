import { auth } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";

async function loginUserWithEmailAndPassword(
  email: string,
  password: string
): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password);
}

async function logOut() {
  await signOut(auth);
}

async function registerUserWithEmailAndPassword(
  email: string,
  password: string
): Promise<UserCredential> {
  return await createUserWithEmailAndPassword(auth, email, password);
}

const firebaseClient = {
  loginUserWithEmailAndPassword,
  logOut,
  registerUserWithEmailAndPassword,
};

export default firebaseClient;
