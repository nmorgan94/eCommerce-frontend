import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./pages/HomePage";
import BasketPage from "./pages/BasketPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import { Route } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
cookies.set("cookieID", "1", { path: "/" });

const App = () => {
  return (
    <>
      <Navbar />

      <Route exact path="/">
        <HomePage />
      </Route>

      <Route path="/basket">
        <BasketPage />
      </Route>

      <Route path="/products/:id">
        <ProductDetailPage />
      </Route>

      <Route path="/login">
        <LoginPage />
      </Route>

      <Route path="/signup">
        <SignupPage />
      </Route>

      <Route path="/checkout">
        <CheckoutPage />
      </Route>
    </>
  );
};

export default App;
