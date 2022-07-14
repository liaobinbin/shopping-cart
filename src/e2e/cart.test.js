import { TARGET_URL, sleep } from "./utils";
const puppeteer = require("puppeteer");

describe("Test Shpping Cart Task", () => {
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

    await page.goto(TARGET_URL, {
      waitUntil: "networkidle0",
    });
  });

  afterAll(() => {
    if (browser && browser.close) {
      browser.close();
    }
  });

  test("add product to cart", async () => {
    const countEl = await page.$(".style_cart-total__zY-YY");
    const beforCount = await page.evaluate(
      (el) => Number(el.innerHTML),
      countEl
    );

    const addToCartSelector = ".style_product-buy-button__YVl4R";
    await page.waitForSelector(addToCartSelector);
    const buttons = await page.$(addToCartSelector);
    await page.click(addToCartSelector);

    const afterCount = await page.evaluate(
      (el) => Number(el.innerHTML),
      countEl
    );
    expect(afterCount).toBe(beforCount + 1);
  });

  test("open or close cart panel", async () => {
    const isOpenSelector = ".style_cart__YDlNI > button.style_open__xP81y";
    const checkPanelStatus = async (status) => {
      const current = await page.$(isOpenSelector);
      expect(!!current).toBe(status);
    };
    const toggleBtnSelector = ".style_cart__YDlNI > button";
    await page.waitForSelector(toggleBtnSelector);
    const toggleBtn = await page.$(toggleBtnSelector);
    await toggleBtn.click();
    await page.waitForSelector(isOpenSelector);
    await checkPanelStatus(true);
    await sleep(1000);
    await toggleBtn.click();
    await checkPanelStatus(false);
  }, 20000);

  test("checkout", async () => {
    const toggleBtnSelector = ".style_cart__YDlNI > button";
    await page.waitForSelector(toggleBtnSelector);
    const toggleBtn = await page.$(toggleBtnSelector);
    await toggleBtn.click();

    const checkoutSelector = ".style_cart-content-footer__checkout__mkiEC";
    await page.waitForSelector(checkoutSelector);
    const checkoutBtn = await page.$(checkoutSelector);
    await checkoutBtn.click();

    const cartItemSelector = ".style_product__USpT4";
    // await page.waitForSelector(cartItemSelector);
    const items = await page.$$(cartItemSelector);

    expect(items.length).toBe(0);
  }, 20000);
});
