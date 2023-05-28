import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/dist/css/app.css";
import Store from "./data/Store";

export const server = process.env.REACT_APP_SERVER;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Store>
      <App />
    </Store>
  </BrowserRouter>
);
