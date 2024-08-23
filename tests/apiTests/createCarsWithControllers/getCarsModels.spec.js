import { test, expect } from "@playwright/test";
import CarsController from "../../../src/controllers/CarsController";

test.describe("Get car models", () => {
  test("should return a list of car models", async ({ request }) => {
    const carsController = new CarsController(request);
    const response = await carsController.getCarsModels();

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.status).toBe("ok");
  });
});