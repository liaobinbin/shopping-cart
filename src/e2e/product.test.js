import { TARGET_URL, sleep, randomRange } from "./utils";
const puppeteer = require("puppeteer");

describe("Test Product List Task", () => {
  let browser;
  let context;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      devtools: false,
      slowMo: 100,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });

    context = await browser.createIncognitoBrowserContext();

    page = await context.newPage();
    // handle alert accpt
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    page.$$eval;

    await page.goto(TARGET_URL, {
      waitUntil: "networkidle0",
    });
  });

  afterAll(() => {
    if (browser && browser.close) {
      browser.close();
    }
  });

  test("filter function", async () => {
    const filterBtnSelector = ".style_filter-checkbox__Vm5kn";
    await page.waitForSelector(filterBtnSelector);
    const filterBtns = await page.$$(filterBtnSelector);

    const filterBtn = filterBtns[randomRange(0, filterBtns.length - 1)];
    const size = await page.evaluate((el) => el.innerText, filterBtn);

    await filterBtn.click();

    // check filter prodcut include current size
    const productSelector = ".style_product__MB6aK";
    await page.waitForSelector(productSelector);
    // 这个方法可以减少在循环中使用await
    const productList = await page.$$eval(productSelector, (products) => {
      return products.map((product) => {
        const sizes = product.querySelectorAll(
          ".style_product-size-item__ec3B1"
        );

        return Array.from(sizes).map((size) => size.innerText);
      });
    });
    for (let prodcut of productList) {
      expect(prodcut).toContain(size);
    }

    // if (productList.length) {
    //   for (let i = 0; i < productList.length; i++) {
    //     await productList[i].waitForSelector(".style_product-size-item__ec3B1");
    //     const sizeItemList = await productList[i].$$(
    //       ".style_product-size-item__ec3B1"
    //     );

    //     const sizeList = [];
    //     for (let j = 0; j < sizeItemList.length; j++) {
    //       const str = await page.evaluate(
    //         (el) => el.innerText,
    //         sizeItemList[j]
    //       );
    //       sizeList.push(str);
    //     }
    //     console.log(size, sizeList);
    //     expect(sizeList).toContain(size);
    //   }
    // }
  }, 20000);

  test("sort function", async () => {
    await page.reload();
    const sortSelector = ".ant-select";
    await page.waitForSelector(sortSelector);
    // open select
    await page.click(sortSelector);

    const sortItemSelector = ".ant-select-item.ant-select-item-option";
    await page.waitForSelector(sortItemSelector);
    const items = await page.$$(sortItemSelector);
    await items[0].click();

    const priceSelector = ".style_product-price-val__0nawX";
    await page.waitForSelector(priceSelector);
    const prices = await page.$$eval(priceSelector, (p) => {
      return p.map((price) => {
        return Number(price.innerText.replace("$", ""));
      });
    });

    prices.reduce((pre, cur) => {
      expect(cur).toBeGreaterThanOrEqual(pre);
      return cur;
    });

    await page.click(sortSelector);

    await items[1].click();

    const newPrices = await page.$$eval(priceSelector, (p) => {
      return p.map((price) => {
        return Number(price.innerText.replace("$", ""));
      });
    });
    newPrices.reduce((pre, cur) => {
      expect(cur).toBeLessThanOrEqual(pre);
      return cur;
    });
  }, 20000);
});
