import { expect, test } from "@playwright/test";

test.only("Mock profile", async ({ page }) => {
  const sigInBtn = page.locator(".header_signin");
  const emailInput = page.locator("#signinEmail");
  const passwordInput = page.locator("#signinPassword");
  const loginBtn = await page.locator(
    'button.btn.btn-primary:has-text("Login")'
  );
  const profileBtn = await page.locator(
    'a.btn-sidebar.sidebar_btn:has-text("Profile")'
  );

  await page.goto("/");

  await sigInBtn.click();
  await emailInput.fill("a.filatov1@yopmail.com");
  await passwordInput.fill("Aaa!1234");

  await loginBtn.click();

  await page.waitForTimeout(10000);

  const modifiedResponse = {
    status: "ok",
    data: {
      userId: 131365,
      photoFilename: "modified-user.png",
      name: "Andrew",
      lastName: "MockedUser",
    },
  };

  await page.route("/api/users/profile", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(modifiedResponse),
    });
  });

  await profileBtn.click();

  const profileName = await page.locator(".profile_name");

  expect(profileName).toContainText(
    `${modifiedResponse.data.name} ${modifiedResponse.data.lastName}`
  );
});
