import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./components/App.tsx";
import "./styles.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
