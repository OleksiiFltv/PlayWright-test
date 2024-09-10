import { expect, test } from "@playwright/test";
import CarsController from "../../../src/controllers/CarsController";
import { CAR_BRANDS } from "../../../src/data/carBrand";
import { CAR_MODELS } from "../../../src/data/carModels";

test.describe("Get user cars", () => {
  const carBrand = CAR_BRANDS.BMW;
  let carsController;

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
    carsController = new CarsController(request);
  });

  for (const carModel of Object.values(CAR_MODELS.BMW)) {
    test(`login and create a car ${carBrand.title} ${carModel.title}`, async ({
      request,
    }) => {
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

  test("user cars", async ({ request }) => {
    const response = await carsController.getCars();

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.status).toBe("ok");
  });

  test.afterAll(async ({ request }) => {
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
