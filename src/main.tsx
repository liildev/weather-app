import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { history } from "./utils";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HistoryRouter history={history as any}>
      <App />
    </HistoryRouter>
  </React.StrictMode>
);
