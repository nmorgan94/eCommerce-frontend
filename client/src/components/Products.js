import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import styled from "styled-components";

export const Products = inject("dataStore")(
  observer(({ dataStore }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch("/products")
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setProducts(res);
        })
        .catch((err) => console.log(err));
    }, []);

    const listItems = products.map((item) => (
      <Product key={item.id}>
        <StyledLink to={`/products/${item.id}`}>
          <ItemName>{item.name}</ItemName>
          <div>
            <img src={item.pictureUrl} alt={item.name} />
          </div>
          <div>
            <p>Price: {item.price}$</p>
          </div>
        </StyledLink>
      </Product>
    ));

    return <ProductWrapper>{listItems}</ProductWrapper>;
  })
);

const Product = styled.div`
  background-color: white;
  border-radius: 1rem;
  text-decoration: none;
  width: 30%;
  margin: 2rem 0.1rem;
`;

const ProductWrapper = styled.div`
  text-decoration: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  text-align: center;
`;

const ItemName = styled.h3`
  text-decoration: none;
  color: black;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
`;
