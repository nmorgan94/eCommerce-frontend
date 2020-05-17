import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";

const BasketPage = inject("dataStore")(
  observer(({ dataStore }) => {
    useEffect(() => {
      dataStore.getBasket();
    }, [dataStore]);

    const items = dataStore.basketContent.map((item) => (
      <div key={item.product.id}>
        <div className="">
          <div className="card-image">
            <img src={item.product.pictureUrl} alt={item.product.name} />
            <span className="card-title">{item.product.name}</span>
          </div>
          <div className="card-content row white">
            <div className="col s6">
              <b>Price: £{item.product.price}</b>
            </div>
            <div className="col s6">
              <b>Quantity: {item.quantity}</b>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <div>{items}</div>
        <div className="">Subtotal: £{dataStore.basket.basketPrice}</div>
        <button>Procceed to Checkout</button>
      </div>
    );
  })
);

export default BasketPage;
