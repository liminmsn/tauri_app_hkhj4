import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider } from "./hooks/ThemeProvider";
import HistoryProvider from "./hooks/HistoryProvider";
import CateGoryProvider from "./hooks/CateGoryProvider";
import MemberProvider from "./hooks/MemberProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <CateGoryProvider>
        <HistoryProvider>
          <MemberProvider>
            <RouterProvider router={router} />
          </MemberProvider>
        </HistoryProvider>
      </CateGoryProvider>
    </ThemeProvider>
  </React.StrictMode>
);