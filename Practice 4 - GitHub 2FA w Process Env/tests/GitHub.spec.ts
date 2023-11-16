import { test, expect } from "@playwright/test";

test("Login using OTP, Global Setup & Process Env", async ({ page }) => {
    //Action
  await page.goto("https://github.com/");
  //Assertion
  await expect(page).toHaveURL("https://github.com/");
});