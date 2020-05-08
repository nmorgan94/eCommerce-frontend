import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import styled from "styled-components";

export const Products = inject("dataStore")(
  observer(({ dataStore }) => {
    useEffect(() => {
      dataStore.getProducts();
    }, []);

    const listItems = dataStore.products.map((item) => (
      <Product key={item.id}>
        <Link to={`/products/${item.id}`}>
          <span>{item.name}</span>
          <div>
            <img src={item.pictureUrl} alt={item.name} />
          </div>
          <div>
            <p>
              <b>Price: {item.price}$</b>
            </p>
          </div>
        </Link>
      </Product>
    ));

    return <ProductWrapper>{listItems}</ProductWrapper>;
  })
);

const Product = styled.div`
  background-color: = red;
  border-style: solid;
  width: 30%;
  margin: 3rem 0;
  padding: 0;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
