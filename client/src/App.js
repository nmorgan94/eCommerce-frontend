import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Route, Switch, withRouter } from "react-router-dom";

let environment = process.env.REACT_APP_ENVIRONMENT || "local";
let API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "localhost";
let API_BASE_PORT = process.env.REACT_APP_API_PORT || "5000";

function App() {
  // useEffect(() => {}, []);

  // const getProducts = () => {
  //   console.log("about to call products");
  //   fetch("/products")
  //     .then((res) => res.text())
  //     .then((text) => console.log(text))
  //     .catch(() => console.log("Products api call failed"));
  // };

  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
