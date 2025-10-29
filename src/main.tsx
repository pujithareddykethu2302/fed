import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import "./index.css";
import { NotesProvider } from "./components/common/NotesContext";
import { ChallengeProvider } from "./components/common/ChallengeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChallengeProvider>
      <NotesProvider>
        <RouterProvider router={router} />
      </NotesProvider>
    </ChallengeProvider>
  </React.StrictMode>
);
