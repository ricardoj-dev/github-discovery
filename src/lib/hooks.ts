import { useContext } from "react";
import RepositoriesContext from "@/contexts/RepositoriesContext";
import TopicsContext from "@/contexts/TopicsContext";
import BookmarksContext from "@/contexts/BookmarksContext";

// ----------------
// --- Contexts ---
// ----------------

export const useBookmarksContext = () => {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarksContextProvider"
    );
  }

  return context;
};

export const useRepositoriesContext = () => {
  const context = useContext(RepositoriesContext);

  if (!context) {
    throw new Error(
      "useRepositoriesContext must be used within a RepositoriesContextProvider"
    );
  }

  return context;
};

export const useTopicsContext = () => {
  const context = useContext(TopicsContext);

  if (!context) {
    throw new Error(
      "useTopicsContext must be used within a TopicsContextProvider"
    );
  }

  return context;
};
