import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IProduct } from "@models";
import { getProducts } from "@api";
import { store } from "@store";

export type IProductsState = {
  loading: boolean;
  products: IProduct[];
};

type IProductsReducer = {
};

export const fetchProducts = createAsyncThunk("fetch/products", async () => {
  const products = await getProducts();

  return products;
});

export const filterProducts = createAsyncThunk(
  "filter/products",
  async (filters: string[]) => {
    const products = await getProducts();
    let filteredProducts;

    if (filters && filters.length > 0) {
      filteredProducts = products.filter((p) =>
        filters.find((filter: string) =>
          p.availableSizes.find((size: string) => size === filter)
        )
      );
    } else {
      filteredProducts = products;
    }
    return { filters, products: filteredProducts };
  }
);

export const productsSlice = createSlice<IProductsState, IProductsReducer>({
  name: "product",
  initialState: {
    loading: false,
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(filterProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    });
    builder.addCase(filterProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export type AppDispatch = typeof store.dispatch;