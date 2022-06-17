import React from "react";

import { CartProduct } from "@components";
import style from "./style.module.less";

export const Cart: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggleCart = (open: boolean) => {
    setOpen(!open);
  };

  const product = {
    availableSizes: ["X", "L", "XL", "XXL"],
    currencyFormat: "$",
    currencyId: "USD",
    description: "14/15 s/nº",
    id: 0,
    installments: 9,
    isFreeShipping: true,
    price: 10.9,
    quantity: 1,
    sku: 8552515751438644,
    style: "White T-shirt",
    title: "Cropped Stay Groovy off white",
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
            <div className={style["cart-total"]}>10</div>
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
              <div className={style["cart-total"]}>10</div>
            </div>
            <span className={style["cart-content-header__title"]}>Cart</span>
          </div>

          <CartProduct product={product} />
          <div className={style["cart-content-footer"]}>
            <p className={style["cart-content-footer__title"]}>SUBTOTAL</p>
            <div className={style["cart-content-footer__price"]}>
              <p className={style.value}>200</p>

              <p className={style.installment}>$</p>
            </div>
            <button
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
