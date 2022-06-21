import React, { Dispatch } from "react";
import { ProductList, Filter, Loader, Cart } from "@components";
import { useDispatch, useSelector } from "react-redux";
import { RootState, fetchProducts, AppDispatch, IProductsState } from "@store";
import style from "./style.module.less";

export const ShoppingCart: React.FC = () => {
  const { products, loading } = useSelector<RootState, IProductsState>((state) => state.product);
  const dispatch: AppDispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchProducts())
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
