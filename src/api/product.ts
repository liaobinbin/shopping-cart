import { IGetProductsResponse } from "@models";

const isProduction = process.env.NODE_ENV === "production";

export const getProducts = async () => {
  let response: IGetProductsResponse;

  if (isProduction) {
    const res = await fetch(
      "https://liaobinbin.github.io/shopping-cart/json/products.json"
    );
    const body = await res.json()
    response = body.data;
  } else {
    response = require("../mock/json/products.json").data
  };

  return response.products;
};
