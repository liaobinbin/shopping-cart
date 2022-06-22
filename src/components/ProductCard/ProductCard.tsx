import React from "react";

import { useDispatch } from 'react-redux'
import { AppDispatch, cartSlice } from '@store'
import { IProduct } from "@models";
import { formatPrice } from "@utils";
import style from "./style.module.less";

export interface ProductCardProps {
  product: IProduct;
}

// const getImgUrl = (sku: number, hover: boolean) => {
//   if (hover) {
//     return `./products/${sku}-2-product.webp`;
//   }
//   return `./products/${sku}-1-product.webp`;
// };

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    sku,
    title,
    price,
    installments,
    currencyId,
    currencyFormat,
    isFreeShipping,
    availableSizes,
  } = product;

  const [hover, setHover] = React.useState<boolean>(false);

  const formattedPrice = formatPrice(price, currencyId);

  const dispatch: AppDispatch = useDispatch()

  const addToCart = () => {
    dispatch(cartSlice.actions.addProduct({ ...product, quantity: 1 }))
  }

  return (
    <div
      className={style.product}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {isFreeShipping && (
        <div className={style["product-stopper"]}>Free shipping</div>
      )}

      <img
        style={{display: hover ? 'block' : 'none'}}
        src={`./products/${sku}-2-product.webp`}
        className={style["product-image"]}
        alt={title}
      />

      <img
        style={{display: !hover ? 'block' : 'none'}}
        src={`./products/${sku}-1-product.webp`}
        className={style["product-image"]}
        alt={title}
      />
      <h3 className={style["product-name"]}>{title}</h3>
      <div className={style["product-size"]}>
        {availableSizes.map((size) => {
          return (
            <span className={style["product-size-item"]} key={size}>
              {size}
            </span>
          );
        })}
      </div>
      <div className={style["product-price"]}>
        <p className={style["product-price-val"]}>
          <small>{currencyFormat}</small>
          <b>{formattedPrice.substring(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substring(formattedPrice.length - 3)}</span>
        </p>
        {installments && (
          <p className={style["product-price-discount"]}>
            <span>or {installments} x </span>
            <b>
              {currencyFormat}
              {formatPrice(price / installments, currencyId)}
            </b>
          </p>
        )}
      </div>
      <button
        onClick={addToCart}
        className={
          hover
            ? [
              style["product-buy-button"],
              style["product-buy-button__hover"],
            ].join(" ")
            : style["product-buy-button"]
        }
      >
        Add to cart
      </button>
    </div>
  );
};
