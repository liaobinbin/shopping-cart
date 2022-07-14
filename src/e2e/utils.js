export const TARGET_URL = "http://localhost:3000/shopping-cart/";

export const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const randomRange = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};
