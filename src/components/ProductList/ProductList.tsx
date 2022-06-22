import React from "react";
import { ProductCard } from "@components";
import { IProduct } from "@models";
import style from "./style.module.less";

export interface ProductListProps {
  list: IProduct[];
}

export const ProductList: React.FC<ProductListProps> = ({ list }) => {
  return (
    <div className={style["product-list"]}>
      {list.length && list.map((product) => {
        return <ProductCard product={product} key={product.sku} />;
      })}
    </div>
  );
};
