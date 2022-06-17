import React, { Dispatch } from "react";
import { ProductList, Filter, Loader, Cart } from "@components";
import { useDispatch, useSelector } from "react-redux";
import { store, RootState, productsSlice } from "@store";
import style from "./style.module.less";

export const ShoppingCart: React.FC = () => {
  const { cart, product } = useSelector<RootState, RootState>((state) => state);
  const { loading, products } = product;

  React.useEffect(() => {
    console.log(productsSlice.actions);
  }, []);

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
