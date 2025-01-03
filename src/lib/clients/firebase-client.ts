import { auth } from '@/config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
  updateEmail,
} from 'firebase/auth';

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

async function setUserEmail(email: string) {
  if (auth.currentUser) {
    await updateEmail(auth.currentUser, email);
  }
}

const firebaseClient = {
  loginUserWithEmailAndPassword,
  logOut,
  registerUserWithEmailAndPassword,
  setUserEmail,
};

export default firebaseClient;
