import { test, expect } from '@playwright/test';
import * as OTPAuth from "otpauth";

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

test('test bypass 2FA', async ({ page }) => {
  
  await page.goto('https://github.com/')

  await page.getByRole('link', { name: 'Sign in' }).click()
  await page.getByLabel('Username or email address').fill(username)
  await page.getByLabel('Username or email address').press('Tab')
  await page.getByLabel('Password').fill(password)
  //await page.pause();
  await page.locator(".js-sign-in-button").click()
  await page.getByPlaceholder('XXXXXX').fill(totp.generate());
  await expect(page).toHaveURL("https://github.com/");

})