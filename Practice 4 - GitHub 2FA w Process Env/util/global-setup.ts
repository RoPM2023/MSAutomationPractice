import { Browser, Page, chromium, expect } from "@playwright/test";
import * as OTPAuth from 'otpauth';
import 'dotenv/config';

let totp = new OTPAuth.TOTP({
  issuer: "GitHub",
  label: process.env.USERNAME,
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: process.env.SECRETKEY,
})

async function globalSetup(): Promise<void> {
  let browser: Browser = await chromium.launch({ headless: false });
  let context = await browser.newContext();
  let page : Page = await context.newPage();


  await page.goto('https://github.com/')

  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.pause();
  await console.log(process.env.USERNAME1);
  await page.getByLabel('Username or email address').fill(process.env.USERNAME1!);
  await page.getByLabel('Username or email address').press('Tab');
  await page.getByLabel('Password').fill(process.env.PASSWORD!);
  await page.locator(".js-sign-in-button").click();
  await page.getByPlaceholder('XXXXXX').fill(totp.generate());
  await expect(page).toHaveURL("https://github.com/");

  //Save the state of the webpage
  await page.context().storageState({ path: "util/storage-state.json" });
  await browser.close();
}

export default globalSetup;