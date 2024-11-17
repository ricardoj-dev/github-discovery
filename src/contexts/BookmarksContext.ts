import { Repository } from "@/types";
import { createContext } from "react";

type BookmarksContextType = {
  bookmarks: Repository[];
  toggleBookmark: (repository: Repository) => void;
};

const BookmarksContext = createContext<BookmarksContextType | null>(null);

export default BookmarksContext;
