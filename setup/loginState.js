import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto("https://qauto.forstudy.space");

  const sigInBtn = page.locator(".header_signin");
  const emailInput = page.locator("#signinEmail");
  const passwordInput = page.locator("#signinPassword");
  const loginBtn = await page.locator(
    'button.btn.btn-primary:has-text("Login")'
  );

  await sigInBtn.click();
  await emailInput.fill("a.filatov1@yopmail.com");
  await passwordInput.fill("Aaa!1234");

  await loginBtn.click();

  await context.storageState({ path: "storageState.json" });

  await browser.close();
})();
