import React from "react";
import { Redirect } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import { AddressDetails } from "../components/AddressDetails";
import { BasketDetails } from "../components/BasketDetails";

const CheckoutPage = () => {
  const isLogged = localStorage.getItem(ACCESS_TOKEN);
  console.log("logged: " + isLogged);
  //   if (!isLogged) {
  //     return <Redirect to="/basket" />;
  //   }
  return (
    <div>
      <h1>Checkout</h1>

      <div>
        <BasketDetails />
      </div>
      <div>
        <AddressDetails />
      </div>
    </div>
  );
};

export default CheckoutPage;
