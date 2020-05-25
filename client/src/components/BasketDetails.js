import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";

export const BasketDetails = inject("dataStore")(
  observer(({ dataStore }) => {
    useEffect(() => {
      dataStore.getBasket();
    }, [dataStore]);

    if (dataStore.basketContent.length === 0) {
      return <Redirect to="/basket" />;
    }

    return <p>Your order today will cost £{dataStore.basket.basketPrice}</p>;
  })
);
