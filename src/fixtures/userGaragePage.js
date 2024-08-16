import { test as base, expect } from "@playwright/test";

const test = base.extend({
  userGaragePage: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto("/panel/garage");
    await use(page);
    await page.close();
  },
});

export { test };
