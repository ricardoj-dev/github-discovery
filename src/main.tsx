import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import AuthContextProvider from "./contexts/providers/AuthContextProvider";
import BookmarksContextProvider from "./contexts/providers/BookmarksContextProvider";
import RepositoriesContextProvider from "./contexts/providers/RepositoriesContextProvider";
import TopicsContextProvider from "./contexts/providers/TopicsContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <TopicsContextProvider>
        <RepositoriesContextProvider>
          <BookmarksContextProvider>
            <RouterProvider router={router} />
          </BookmarksContextProvider>
        </RepositoriesContextProvider>
      </TopicsContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
