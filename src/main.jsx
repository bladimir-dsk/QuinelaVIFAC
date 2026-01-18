import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import "./styles/globals.css";
import LandingPage from "./screen/LandingPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LandingPage></LandingPage>
  </StrictMode>,
);
