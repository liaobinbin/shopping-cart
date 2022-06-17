import { IGetProductsResponse } from "@models";

const isProduction = process.env.NODE_ENV === "production";

export const getProducts = async () => {
  let response: IGetProductsResponse;

  if (!isProduction) {
    const res = await fetch(
      "https://react-shopping-cart-67954.firebaseio.com/products.json"
    );
    response = await res.json();
  } else {
    response = require("../mock/json/products.json");
  }

  return response.products;
};
