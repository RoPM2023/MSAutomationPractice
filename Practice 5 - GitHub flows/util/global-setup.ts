import { Browser, Page, chromium, expect } from "@playwright/test";
import * as OTPAuth from 'otpauth';

const username = "TestingGit2023";
const password = "Something.1.2023"
const secretKey = "RQCOLBWNE4J55KSH"

let totp = new OTPAuth.TOTP({
  issuer: "GitHub",
  label: username,
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: secretKey,
})

async function globalSetup(): Promise<void> {
  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page : Page = await context.newPage();


  await page.goto('https://github.com/')

  await page.getByRole('link', { name: 'Sign in' }).click()
  //await page.pause();
  await page.getByLabel('Username or email address').fill(username)
  await page.getByLabel('Username or email address').press('Tab')
  await page.getByLabel('Password').fill(password)
  await page.locator(".js-sign-in-button").click()
  await page.getByPlaceholder('XXXXXX').fill(totp.generate());
  await expect(page).toHaveURL("https://github.com/");

  //Save the state of the webpage
  await page.context().storageState({ path: "util/storage-state.json" });
  await browser.close();
}

export default globalSetup;