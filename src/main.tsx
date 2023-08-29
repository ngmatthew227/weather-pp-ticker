import React from "react";
import ReactDOM from "react-dom/client";
import AlertMsg from "./AlertMsg.tsx";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AlertMsg />
    <App />
  </React.StrictMode>
);
