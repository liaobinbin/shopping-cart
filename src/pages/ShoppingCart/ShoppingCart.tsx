import React, { useState } from "react";
import { Select } from "antd";
import { ProductList, Filter, Loader, Cart } from "@components";
import { useDispatch, useSelector } from "react-redux";
import { RootState, fetchProducts, AppDispatch, IProductsState } from "@store";
import style from "./style.module.less";
import { IProduct } from "@models";

const Option = Select.Option;

export const ShoppingCart: React.FC = () => {
  const { products, loading } = useSelector<RootState, IProductsState>(
    (state) => state.product
  );
  const [type, setType] = useState<string | undefined>(undefined);
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [list, setList] = useState<IProduct[]>([...products]);

  React.useEffect(() => {
    setList([...products]);
    setType(undefined);
  }, [products]);

  const handleOrderChange = (value: string) => {
    setType(!value ? undefined : value);
    switch (value) {
      case "1":
        setList([...products].sort((a, b) => a.price - b.price));
        break;
      case "2":
        setList([...products].sort((a, b) => b.price - a.price));
        break;
      default:
        setList([...products]);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={style.cart}>
        <aside className={style["cart-side"]}>
          <Filter />
        </aside>
        <main className={style["cart-main"]}>
          <div className={style["cart-main-header"]}>
            {list?.length} Product(s) found
            <div className={style["cart-main-header__select"]}>
              <Select
                value={type}
                allowClear
                style={{ width: 120 }}
                placeholder="Order By"
                onChange={handleOrderChange}
              >
                <Option value="1">Low to High</Option>
                <Option value="2">High to Low</Option>
              </Select>
            </div>
          </div>
          {list && <ProductList list={list} />}
        </main>
        <Cart />
      </div>
    </>
  );
};
