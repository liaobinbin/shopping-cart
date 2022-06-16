import React from "react";

import style from "./style.module.less";

export const Cart: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggleCart = (open: boolean) => {
    setOpen(!open);
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
            <div className={style["cart-total"]}>3123</div>
          </div>
        )}

        {open && <div className={style["cart-content"]}></div>}
      </button>
    </div>
  );
};
