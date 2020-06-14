import React from "react";
import { ACCESS_TOKEN } from "../constants";
import { AddressDetails } from "../components/AddressDetails";
import { BasketDetails } from "../components/BasketDetails";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import colours from "../styles/colours";

const CheckoutPage = () => {
  const isLogged = localStorage.getItem(ACCESS_TOKEN);
  console.log("logged: " + isLogged);
  if (!isLogged) {
    return <Redirect to="/login" />;
  }

  return (
    <CheckoutWrapper>
      <h2>Checkout</h2>

      <div>
        <BasketDetails />
      </div>
      <div>
        <AddressDetails />
      </div>
    </CheckoutWrapper>
  );
};

const CheckoutWrapper = styled.div`
  width: 25%;
  text-align: center;
  border: 1px solid ${colours.lightGrey};
  margin: 2rem auto;
  border-radius: 1rem;
`;

export default CheckoutPage;
