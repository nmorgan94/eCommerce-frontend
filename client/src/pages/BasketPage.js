import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import colours from "../styles/colours";
import { Button } from "../styles/StyledComponents";
import { useHistory } from "react-router-dom";

const BasketPage = inject("dataStore")(
  observer(({ dataStore }) => {
    useEffect(() => {
      dataStore.getBasket();
    }, [dataStore]);

    console.log(dataStore.basketContent.length);
    let history = useHistory();
    const items = dataStore.basketContent.map((item) => (
      <ItemWrapper key={item.product.id}>
        <div>
          <h2>Shopping Basket</h2>
          <ProductImageAndName>
            <img src={item.product.pictureUrl} alt={item.product.name} />
            <BasketInfo>{item.product.name}</BasketInfo>
          </ProductImageAndName>
          <div>
            <BasketInfo>
              <b>Price: £{item.product.price}</b>
            </BasketInfo>
            <BasketInfo>
              <b>Quantity: {item.quantity}</b>
            </BasketInfo>
          </div>
        </div>
      </ItemWrapper>
    ));

    return (
      <BasketWrapper>
        {dataStore.basketContent.length === 0 ? (
          <>
            {console.log("bong")}
            <h2>Your basket is empty.</h2>
          </>
        ) : (
          <>
            {console.log("bang")}
            <div>{items}</div>
            <BasketInfo>Subtotal: £{dataStore.basket.basketPrice}</BasketInfo>
            <Button onClick={() => history.push("/Checkout")}>
              Procceed to Checkout
            </Button>
          </>
        )}
      </BasketWrapper>
    );
  })
);

const ItemWrapper = styled.div`
  border-bottom: 1px solid ${colours.lightGrey};
`;

const BasketWrapper = styled.div`
  padding: 0 2rem;
`;

const ProductImageAndName = styled.div`
  display: flex;
`;

const BasketInfo = styled.div`
  padding: 1rem;
`;

export default BasketPage;
