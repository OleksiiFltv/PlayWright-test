import { expect, test } from "@playwright/test";
import { CAR_MODELS } from "../../../src/data/carModels";

test.describe("update car", () => {
  let carController;
  const carBrand = CAR_BRANDS.Porsche;

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

  carController = new CarsController(request);
  for (const carModel of Object.values(CAR_MODELS.Porsche)) {
    test(`create and update car`, async ({ reqest }) => {
      const createRequestBody = {
        carBrandId: carBrand.id,
        carModelId: carModel.id,
        mileage: Math.floor(Math.random() * 100),
      };

      const createResponse = await carController.createCar(createRequestBody); // создаем машину
      expect(createResponse.status()).toBe(201);

      const createdCar = await createResponse.json();
      expect(createdCar.status).toBe("ok");

      const updateMileage = Math.floor(Math.random() * 100) + 100; // новый mileage
      const updateRequestBody = {
        mileage: updateMileage,
      };

      const updateResponse = await carController.updateCar(
        createdCar.data.id,
        updateRequestBody
      );

      expect(updateResponse.status()).toBe(200);

      const updatedCar = await updateResponse.json();

      expect(updatedCar.status).toBe("ok");
      expect(updatedCar.data.mileage).toBe(updateMileage);
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
