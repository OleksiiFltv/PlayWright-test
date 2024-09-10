import { expect, test } from "@playwright/test";
import { request } from "https";
import CarsController from "../../../src/controllers/CarsController";
import { CAR_BRANDS } from "../../../src/data/carBrand";

test.describe("get car brand by id", () => {
  for (const carBrand of Object.values(CAR_BRANDS)) {
    test(`should return the brand for ${carBrand.title}`, async ({
      request,
    }) => {
      const carsController = new CarsController(request);
      const response = await carsController.getCarsBrandByID(carBrand.id);

      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.status).toBe("ok");
    });
  }
});
