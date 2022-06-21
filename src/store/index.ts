import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartSlice } from "./slices/cart";
import { productsSlice } from "./slices/products";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ['cart']
};

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  product: productsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const persistedStore = persistStore(store);

export * from "./slices/cart";
export * from "./slices/products";
