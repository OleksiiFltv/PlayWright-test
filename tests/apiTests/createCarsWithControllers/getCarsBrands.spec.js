import { test, expect } from "@playwright/test";
import CarsController from "../../../src/controllers/CarsController";

test.describe("Get car brands", () => {
  test("should return a list of car brands", async ({ request }) => {
    const carsController = new CarsController(request);
    const response = await carsController.getCarsBrands();

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.status).toBe("ok");
  });
});
