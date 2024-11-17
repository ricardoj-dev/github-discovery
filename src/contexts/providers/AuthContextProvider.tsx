import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import AuthContext from "../AuthContext";
import { ApplicationUser } from "@/types";
import firestoreClient from "@/lib/clients/firestore-client";
import appConstants from "@/lib/constants";

type AuthContextProvider = {
  children: React.ReactNode;
};

export default function AuthContextProvider({ children }: AuthContextProvider) {
  const [user, setUser] = useState<ApplicationUser | null>(() => {
    const storedUser = localStorage.getItem("github-discovery-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoadingUser(true);

      if (currentUser) {
        try {
          const userData = await firestoreClient.getUserByUID(currentUser.uid);

          if (userData) {
            const customUser: ApplicationUser = {
              ...currentUser,
              uid: currentUser.uid,
              email: currentUser.email,
              username: userData.username,
              bookmarks: userData.bookmarks || [],
              topics: userData.topics || appConstants.initialTopics,
              sortOptions: userData.sortOptions || {},
            };
            setUser(customUser);
            localStorage.setItem(
              "github-discovery-user",
              JSON.stringify(customUser)
            );

            // Redirects if the user is on the sign-in page.
            if (window.location.pathname === "/sign-in") {
              window.location.replace("/discovery");
            }
          }
        } catch (error) {
          console.error("Error fetching additional user data:", error);
        }
      } else {
        console.log("onAuthStateChanged() - User not authenticated");
        setUser(null);
        localStorage.removeItem("github-discovery-user");

        // If not authenticated and not already on sign-in page
        // redirect to sign-in
        if (window.location.pathname !== "/sign-in") {
          window.location.replace("/sign-in");
        }
      }

      setIsLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      localStorage.removeItem("github-discovery-user");
      window.location.replace("/sign-in");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoadingUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
