import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

async function registerUserWithEmailAndPassword(
  email: string,
  password: string
): Promise<UserCredential> {
  return await createUserWithEmailAndPassword(auth, email, password);
}

const firebaseClient = {
  registerUserWithEmailAndPassword,
};

export default firebaseClient;
