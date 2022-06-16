import React from "react";
import { Button } from "antd";
import { ProductList, Filter, Loader, Cart } from "@components";
import style from "./style.module.less";

export const ShoppingCart: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const products = [
    {
      availableSizes: ["X", "L", "XL", "XXL"],
      currencyFormat: "$",
      currencyId: "USD",
      description: "14/15 s/nº",
      id: 0,
      installments: 9,
      isFreeShipping: true,
      price: 10.9,
      sku: 8552515751438644,
      style: "White T-shirt",
      title: "Cropped Stay Groovy off white",
    },
    {
      availableSizes: ["X", "L", "XL", "XXL"],
      currencyFormat: "$",
      currencyId: "USD",
      description: "14/15 s/nº",
      id: 0,
      installments: 9,
      isFreeShipping: true,
      price: 10.9,
      sku: 8552515751438644,
      style: "White T-shirt",
      title: "Cropped Stay Groovy off white",
    },
    {
      availableSizes: ["X", "L", "XL", "XXL"],
      currencyFormat: "$",
      currencyId: "USD",
      description: "14/15 s/nº",
      id: 0,
      installments: 9,
      isFreeShipping: true,
      price: 10.9,
      sku: 8552515751438644,
      style: "White T-shirt",
      title: "Cropped Stay Groovy off white",
    },
    {
      availableSizes: ["X", "L", "XL", "XXL"],
      currencyFormat: "$",
      currencyId: "USD",
      description: "14/15 s/nº",
      id: 0,
      installments: 9,
      isFreeShipping: true,
      price: 10.9,
      sku: 8552515751438644,
      style: "White T-shirt",
      title: "Cropped Stay Groovy off white",
    },
  ];
  return (
    <>
      {loading && <Loader />}
      <div className={style.cart}>
        <aside className={style["cart-side"]}>
          <Filter />
        </aside>
        <main className={style["cart-main"]}>
          <div className={style["cart-main-header"]}>
            {products?.length} Product(s) found
          </div>
          <ProductList list={products} />
        </main>
        <Cart />
      </div>
    </>
  );
};
