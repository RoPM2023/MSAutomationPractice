import { Browser, Page, chromium, expect } from "@playwright/test";

async function globalSetup(): Promise<void> {
  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page : Page = await context.newPage();


  //await page.pause()
  await page.goto("https://rahulshettyacademy.com/client/");
  await expect(page).toHaveURL("https://rahulshettyacademy.com/client/auth/login");

  await page.locator("#userEmail").fill("negele2329@vinthao.com");
  await page.locator("#userPassword").fill("Something.1");
  await page.locator("#login").click();
  await expect(page).toHaveURL("https://rahulshettyacademy.com/client/dashboard/dash");

  //Save the state of the webpage
  await page.context().storageState({ path: "tests/util/storage-state.json" });
  await browser.close();
}

export default globalSetup;