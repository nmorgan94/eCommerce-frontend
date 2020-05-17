import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import { useParams, useHistory } from "react-router-dom";

const ProductDetailPage = inject("dataStore")(
  observer(({ dataStore }) => {
    let history = useHistory();
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState({});

    useEffect(() => {
      fetch(`/products/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setProductDetail(res);
        })
        .catch((err) => console.log(err));
    }, [id]);

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
            <img src={productDetail.pictureUrl} alt={productDetail.name} />
          </div>
          <div>
            <div>
              <div>{productDetail.name}</div>
              {productDetail.price}
            </div>
          </div>
        </div>
        <button onClick={handleClick}>Add To Basket</button>
      </div>
    );
  })
);

export default ProductDetailPage;
