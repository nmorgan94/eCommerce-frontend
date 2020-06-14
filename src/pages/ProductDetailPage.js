import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/StyledComponents";
import Cookies from "universal-cookie";

const ProductDetailPage = inject("dataStore")(
  observer(({ dataStore }) => {
    let history = useHistory();
    const { id } = useParams();
    const cookies = new Cookies();
    const basketId = cookies.get("cookieID");
    const [productDetail, setProductDetail] = useState({});

    useEffect(() => {
      fetch(`/api/products/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setProductDetail(res);
        })
        .catch((err) => console.log(err));
    }, [id]);

    const handleClick = async () => {
      await fetch(`/api/basket/add/${id}/${basketId}`, {
        method: "POST",
      })
        .then((data) => {
          console.log("data in basket: " + data.json());
          dataStore.basket = data;
        })
        .catch(() => console.log("Add to basket api call failed"));

      history.push(`/basket`);
    };

    return (
      <ProductWrapper>
        <div>
          <div>
            <ImageWrapper
              src={productDetail.pictureUrl}
              alt={productDetail.name}
            />
          </div>
          <div>
            <div>
              <ProdctDetails>{productDetail.name}</ProdctDetails>
              <ProdctDetails>£{productDetail.price}</ProdctDetails>
            </div>
          </div>
        </div>
        <Button onClick={handleClick}>Add To Basket</Button>
      </ProductWrapper>
    );
  })
);

const ProductWrapper = styled.div`
  text-align: center;
  padding: 2rem;
`;

const ProdctDetails = styled.div`
  padding: 1rem;
`;

const ImageWrapper = styled.img`
  height: 80%;
  width: 80%;
`;

export default ProductDetailPage;
