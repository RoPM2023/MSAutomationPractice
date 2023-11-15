import { test, expect } from "@playwright/test";

test("Login using Global Setup", async ({ page }) => {
    //Action
  await page.goto("https://rahulshettyacademy.com/client/");
  //Assertion
  await expect(page).toHaveURL("https://rahulshettyacademy.com/client/dashboard/dash");
});