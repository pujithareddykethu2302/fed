import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import "./index.css";
import { NotesProvider } from "./components/common/NotesContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <NotesProvider>
    <RouterProvider router={router} />
    </NotesProvider>
  </React.StrictMode>
);
