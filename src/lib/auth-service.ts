import firebaseClient from "./clients/firebase-client";
import firestoreClient from "./clients/firestore-client";

async function signUp(username: string, email: string, password: string) {
  const userCredential = await firebaseClient.registerUserWithEmailAndPassword(
    email,
    password
  );

  const createdUser = userCredential.user;

  if (!createdUser.uid) {
    throw new Error("Error. Failed in creating new user.");
  }

  const userByEmail = await firestoreClient.getUserByEmail(email);
  if (!userByEmail.empty) {
    throw new Error("Email already exists. Please choose a different one.");
  }

  const userByUsername = await firestoreClient.getUserByUsername(username);
  if (!userByUsername.empty) {
    throw new Error("Username already exists. Please choose a different one.");
  }

  await firestoreClient.addNewUser(createdUser.uid, username, email);
}

const authService = {
  signUp,
};

export default authService;
