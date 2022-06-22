import React from "react";
import { useDispatch } from 'react-redux'



import { cartSlice, AppDispatch } from '@store'
import { ICartProduct } from "@models";
import { formatPrice } from "@utils";
import style from "./style.module.less";

export interface CartProductProps {
  product: ICartProduct;
}

const getImgUrl = (sku: number) => {
  return `./products/${sku}-1-cart.webp`;
};

export const CartProduct: React.FC<CartProductProps> = ({ product }) => {
  const dispatch: AppDispatch = useDispatch()
  const {
    sku,
    title,
    price,
    style: productStyle,
    currencyId,
    currencyFormat,
    availableSizes,
    quantity,
  } = product;



  return (
    <div className={style.product}>
      <button
        onClick={() => { dispatch(cartSlice.actions.removeProduct(product)) }}
        className={style["product-delete"]}
        title="remove product from cart"
      ></button>
      <img
        src={getImgUrl(sku)}
        className={style["product-image"]}
        alt={title}
      />
      <div className={style["product-detail"]}>
        <p className={style["product-detail-title"]}>{title}</p>
        <p className={style["product-detail-desc"]}>
          {`${availableSizes[0]} | ${productStyle}`} <br />
          Quantity: {quantity}
        </p>
      </div>
      <div className={style["product-price"]}>
        <p>{`${currencyFormat}  ${formatPrice(price, currencyId)}`}</p>
        <div>
          <button
            onClick={() => {
              dispatch(cartSlice.actions.decreaseProductQuantity(product))
            }}
            className={style["product-price-change"]}
            disabled={quantity === 1 ? true : false}
          >
            -
          </button>
          <button onClick={() => {
            dispatch(cartSlice.actions.increaseProductQuantity(product))
          }} className={style["product-price-change"]}>+</button>
        </div>
      </div>
    </div>
  );
};
