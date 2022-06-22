import { createSlice } from "@reduxjs/toolkit";

import { ICartProduct } from "@models";
import { stat } from "fs";

const updateQuantitySafely = (
  currentProduct: ICartProduct,
  targetProduct: ICartProduct,
  quantity: number
): ICartProduct => {
  if (currentProduct.id === targetProduct.id) {
    return Object.assign({
      ...currentProduct,
      quantity: currentProduct.quantity + quantity,
    });
  } else {
    return currentProduct;
  }
};

const getCartTotal = (
  products: ICartProduct[]
): {
  total: number;
  totalPrice: number;
  installments: number;
  currencyId: string;
  currencyFormat: string;
} => {
  const total = products.reduce((sum: number, product: ICartProduct) => {
    sum += product.quantity;
    return sum;
  }, 0);

  const totalPrice = products.reduce((sum: number, product: ICartProduct) => {
    sum += product.price * product.quantity;
    return sum;
  }, 0);

  const installments = products.reduce(
    (greater: number, product: ICartProduct) => {
      greater = product.installments > greater ? product.installments : greater;
      return greater;
    },
    0
  );

  return {
    total,
    installments,
    totalPrice,
    currencyId: "USD",
    currencyFormat: "$",
  };
};

export type ICartState = {
  products: ICartProduct[];
  total: {
    total: number;
    installments: number;
    totalPrice: number;
    currencyId: string;
    currencyFormat: string;
  };
};

type ICartReducer = {
  addProduct: (state: ICartState, action: { payload: ICartProduct }) => void;
  removeProduct: (state: ICartState, action: { payload: ICartProduct }) => void;
  increaseProductQuantity: (
    state: ICartState,
    action: { payload: ICartProduct }
  ) => void;
  decreaseProductQuantity: (
    state: ICartState,
    action: { payload: ICartProduct }
  ) => void;
  clearProducts: (state: ICartState) => void;
};

export const cartSlice = createSlice<ICartState, ICartReducer>({
  name: "cart",
  initialState: {
    products: [],
    total: {
      total: 0,
      installments: 0,
      totalPrice: 0,
      currencyFormat: '',
      currencyId: ''
    },
  },
  reducers: {
    addProduct: (state, action) => {
      let updatedProducts;
      const isProductAlreadyInCart = state.products.some(
        (product) => action.payload.id === product.id
      );
      if (isProductAlreadyInCart) {
        updatedProducts = state.products.map((product) => {
          return updateQuantitySafely(
            product,
            action.payload,
            action.payload.quantity
          );
        });
      } else {
        updatedProducts = [...state.products, action.payload];
      }

      state.products = updatedProducts;
      state.total = getCartTotal(updatedProducts);
    },
    removeProduct: (state, action) => {
      const updatedProducts = state.products.filter(
        (product) => product.id !== action.payload.id
      );

      state.products = updatedProducts;
      state.total = getCartTotal(updatedProducts);
    },
    increaseProductQuantity: (state, action) => {
      const updatedProducts = state.products.map((product) => {
        return updateQuantitySafely(product, action.payload, +1);
      });

      state.products = updatedProducts;
      state.total = getCartTotal(updatedProducts);
    },
    decreaseProductQuantity: (state, action) => {
      const updatedProducts = state.products.map((product) => {
        return updateQuantitySafely(product, action.payload, -1);
      });

      state.products = updatedProducts;
      state.total = getCartTotal(updatedProducts);
    },
    clearProducts: (state) => {
      state.products = []
      state.total = getCartTotal([])
    }
  },
});
