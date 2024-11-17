import firebaseClient from "./clients/firebase-client";
import firestoreClient from "./clients/firestore-client";

async function setUsernameAndEmail(
  uid: string,
  newUsername: string,
  newEmail?: string
) {
  const userByUsername = await firestoreClient.getUserByUsername(newUsername);
  if (userByUsername.size > 1) {
    throw new Error(`Username ${newUsername} is already registered in system.`);
  }

  if (newEmail) {
    await firebaseClient.setUserEmail(newEmail);
    await firestoreClient.setUserEmail(uid, newEmail);
  }

  await firestoreClient.setUserUsername(uid, newUsername);

  return;
}

const userService = {
  setUsernameAndEmail,
};

export default userService;
