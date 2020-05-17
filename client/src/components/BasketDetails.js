import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";

export const BasketDetails = inject("dataStore")(
  observer(({ dataStore }) => {
    useEffect(() => {
      dataStore.getBasket();
    }, [dataStore]);

    return <h1>{dataStore.basket.basketPrice}</h1>;
  })
);
