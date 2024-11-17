import React, { useState } from "react";
import { RepositoriesMap, Repository } from "@/types";
import BookmarksContext from "../BookmarksContext";
import { useAuth, useRepositoriesContext } from "@/lib/hooks";
import firestoreClient from "@/lib/clients/firestore-client";

type BookmarksContextProvider = {
  children: React.ReactNode;
};

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProvider) {
  const { user } = useAuth();
  const { setRepositoriesFromTopics } = useRepositoriesContext();

  const [bookmarks, setBookmarks] = useState<Repository[]>(
    user?.bookmarks || []
  );

  const toggleBookmark = async (repository: Repository) => {
    const isBookmarked = bookmarks.some((item) => item.id === repository.id);

    // Step 1: Update bookmarks in local state
    const updatedBookmarks = isBookmarked
      ? bookmarks.filter((item) => item.id !== repository.id)
      : [...bookmarks, { ...repository, is_bookmarked: true }];

    setBookmarks(updatedBookmarks);

    if (user) {
      try {
        await firestoreClient.setUserBookmarks(user.uid, updatedBookmarks);
      } catch (error) {
        console.error("Failed to update bookmarks in Firestore:", error);
      }
    }

    setRepositoriesFromTopics((prevRepositoriesFromTopics) => {
      const updatedRepositories = { ...prevRepositoriesFromTopics };

      Object.keys(updatedRepositories).forEach((topic) => {
        const topicKey = topic as keyof RepositoriesMap;

        updatedRepositories[topicKey] = updatedRepositories[topicKey]?.map(
          (repo: Repository) => {
            if (repo.id === repository.id) {
              return { ...repo, is_bookmarked: !isBookmarked };
            }
            return repo;
          }
        );
      });

      return updatedRepositories;
    });
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        toggleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
