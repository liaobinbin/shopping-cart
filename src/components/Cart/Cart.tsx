import React from "react";

import { useSelector, useDispatch } from 'react-redux'
import { ICartState, RootState, AppDispatch, cartSlice } from '@store'
import { CartProduct } from "@components";
import style from "./style.module.less";
import { formatPrice } from "@utils";


export const Cart: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { products, total } = useSelector<RootState, ICartState>(state => state.cart)
  const dispatch: AppDispatch = useDispatch()

  const handleToggleCart = (open: boolean) => {
    setOpen(!open);
  };

  const handleCheckout = () => {
    if (products.length) {
      alert(
        `Checkout - Subtotal: ${total.currencyFormat} ${formatPrice(
          total.totalPrice,
          total.currencyId
        )}`
      );
      dispatch(cartSlice.actions.clearProducts())
    } else {
      alert('Add some product in the cart!');
    }
  };
  return (
    <div
      className={open ? [style.cart, style["cart-open"]].join(" ") : style.cart}
    >
      <button
        className={open ? style.open : ""}
        onClick={() => handleToggleCart(open)}
      >
        {open ? (
          <span>X</span>
        ) : (
          <div className={style["cart-icon"]}>
            <div className={style["cart-total"]}>{products.length}</div>
          </div>
        )}
      </button>
      {open && (
        <div className={style["cart-content"]}>
          <div className={style["cart-content-header"]}>
            <div
              className={style["cart-icon"]}
              style={{ width: "60px", height: "60px" }}
            >
              <div className={style["cart-total"]}>{products.length}</div>
            </div>
            <span className={style["cart-content-header__title"]}>Cart</span>
          </div>
          ({
            products.map(product => <CartProduct product={product} key={product.sku} ></CartProduct>)
          })
          <div className={style["cart-content-footer"]}>
            <p className={style["cart-content-footer__title"]}>SUBTOTAL</p>
            <div className={style["cart-content-footer__price"]}>
              <p className={style.value}>{`${total.currencyFormat} ${formatPrice(total.totalPrice, total.currencyId)}`}</p>

              <p className={style.installment}>{total.installments ? (<span>
                {`OR UP TO ${total.installments} x ${total.currencyFormat
                  } ${formatPrice(total.totalPrice / total.installments, total.currencyId)}`}
              </span>) : null
              }
              </p>
            </div>
            <button
              onClick={handleCheckout}
              autoFocus
              className={style["cart-content-footer__checkout"]}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
