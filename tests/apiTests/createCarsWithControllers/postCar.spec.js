import { expect, test } from "@playwright/test";
import { CAR_BRANDS } from "../../../src/data/carBrand";
import { CAR_MODELS } from "../../../src/data/carModels";
import CarsController from "../../../src/controllers/CarsController";

test.describe.only("create car", () => {
  const carBrand = CAR_BRANDS.BMW;
  test.beforeAll(async ({ request }) => {
    const loginResponse = await request.post("/auth/signin", {
      data: {
        email: "a.filatov8@yopmail.com",
        password: "Aaa!1234",
        remember: true,
      },
    });

    console.log("Login Response Status:", loginResponse.status());
    console.log("Login Response Body:", await loginResponse.text());

    expect(loginResponse.status()).toBe(200);
  });

  for (const carModel of Object.values(CAR_MODELS.BMW)) {
    test(`login and create a car ${carBrand.title} ${carModel.title}`, async ({
      request,
    }) => {
      const carsController = await new CarsController(request);

      const requestBody = {
        carBrandId: carBrand.id,
        carModelId: carModel.id,
        mileage: Math.floor(Math.random() * 100),
      };

      const response = await carsController.createCar(requestBody);

      expect(response.status()).toBe(201);
      const data = await response.json();
      expect(data).toEqual({
        status: "ok",
        data: {
          id: expect.any(Number),
          carBrandId: requestBody.carBrandId,
          carModelId: requestBody.carModelId,
          initialMileage: requestBody.mileage,
          updatedMileageAt: expect.any(String),
          carCreatedAt: expect.any(String),
          mileage: requestBody.mileage,
          brand: carBrand.title,
          model: carModel.title,
          logo: carBrand.logoFilename,
        },
      });
    });
  }

  test.afterAll(async ({ request }) => {
    const carsController = new CarsController(request);

    const response = await carsController.getCars();
    expect(response.status()).toBe(200);

    const carsData = await response.json();
    const cars = carsData.data;

    for (const car of cars) {
      const deleteResponse = await carsController.deleteCar(car.id);
      expect(deleteResponse.status()).toBe(200);
    }
  });
});
