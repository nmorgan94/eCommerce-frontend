import React from "react";
import "mobx-react-lite/batchingForReactDom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import dataStore from "./store/dataStore";
import { Provider } from "mobx-react";

const stores = {
  dataStore,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
