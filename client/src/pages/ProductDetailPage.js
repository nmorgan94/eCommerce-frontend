import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { useParams, useHistory } from "react-router-dom";

const ProductDetailPage = inject("dataStore")(
  observer(({ dataStore }) => {
    let history = useHistory();
    const { id } = useParams();
    const getProducts = () => dataStore.getProductDetail(id);
    useEffect(() => {
      getProducts();
    }, []);

    const handleClick = () => {
      fetch(`/basket/add/${id}`, {
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
      <div>
        <div>
          <div>
            <img
              src={dataStore.productDetail.pictureUrl}
              alt={dataStore.productDetail.name}
            />
          </div>
          <div>
            <div>
              <div>{dataStore.productDetail.name}</div>
              {dataStore.productDetail.price}
              <div></div>
            </div>
          </div>
        </div>
        <button onClick={handleClick}>Add To Basket</button>
      </div>
    );
  })
);

export default ProductDetailPage;
