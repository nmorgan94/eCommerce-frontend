import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

let environment = process.env.REACT_APP_ENVIRONMENT || "local";
let API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "localhost";
let API_BASE_PORT = process.env.REACT_APP_API_PORT || "5000";

function App() {
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    console.log("about to call products");
    fetch("/products")
      .then(res => res.text())
      .then(text => console.log(text))
      .catch(() => console.log("Products api call failed"));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Environment is {environment}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
