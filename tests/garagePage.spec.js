import { test, expect } from "./userGaragePage";

test.describe("success login and go to Fuel expenses", async ({
  userGaragePage,
}) => {
  const fuelExpensesLink = userGaragePage.page.locator(
    'a.btn-sidebar:has-text("Fuel expenses")'
  );
  const fuelHeading = userGaragePage.page.locator(
    'h1:has-text("Fuel expenses")'
  );
  await fuelExpensesLink.click();

  await expect(fuelHeading).toBeVisible();
});
