import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider } from "./hooks/ThemeProvider";
import HistoryProvider from "./hooks/HistoryProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <HistoryProvider>
        <RouterProvider router={router} />
      </HistoryProvider>
    </ThemeProvider>
  </React.StrictMode>
);
