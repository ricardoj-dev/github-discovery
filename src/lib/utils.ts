import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function handleError(error: unknown) {
  let message;

  if (error instanceof FirebaseError) {
    console.error("Firebase error code: ", error.code);
    message = handleFirebaseErrorMessage(error.code);
  } else if (error instanceof Error) {
    console.error("error.message: ", error.message);
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "An error occurred.";
  }

  toast.error(message);
}

// Error message example: Firebase: Error (auth/email-already-in-use)
function handleFirebaseErrorMessage(errorMessage: string) {
  const parts = errorMessage.split("/");

  if (parts.length > 1) {
    const errorCodeWithParentheses = parts[1].split(")")[0]; // Get part after "auth/"

    const formattedMessage = errorCodeWithParentheses
      .replace(/-/g, " ")
      .split(" ")
      .map((word, index) =>
        index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
      )
      .join(" ");

    return formattedMessage + ".";
  }

  return errorMessage;
}
