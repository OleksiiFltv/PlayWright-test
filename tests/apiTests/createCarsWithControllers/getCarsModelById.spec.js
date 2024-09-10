import { expect, test } from "@playwright/test";
import { request } from "https";
import CarsController from "../../../src/controllers/CarsController";
import { CAR_MODELS } from "../../../src/data/carModels";

test.describe("get car model by id", () => {
  for (const carModels of Object.values(CAR_MODELS)) {
    for (const carModel of Object.values(carModels)) {
      test(`should return the model for ${carModel.title}`, async ({
        request,
      }) => {
        const carsController = new CarsController(request);
        const response = await carsController.getCarsModelByID(carModel.id);

        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data.status).toBe("ok");
      });
    }
  }
});
