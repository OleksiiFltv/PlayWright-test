import { expect, test } from "@playwright/test";
import { CAR_BRANDS } from "../../../src/data/carBrand";
import CarsController from "../../../src/controllers/CarsController";
import { CAR_MODELS } from "../../../src/data/carModels";

test.describe("get user cars by id", () => {
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
    test(`create a car ${carBrand.title} ${carModel.title} and verify it by ID`, async ({
      reqest,
    }) => {
      const requestBody = {
        carBrandId: carBrand.id,
        carModelId: carModel.id,
        mileage: Math.floor(Math.random() * 100),
      };

      const createResponse = await carController.createCar(requestBody); // создаем машину
      expect(createResponse.status()).toBe(201);

      const createdCar = await createResponse.json();
      expect(createdCar.status).toBe("ok");

      const carId = createdCar.data.id; //получаю айдишник созданой машины
      const getUserCarID = await carController.getCurrentUserCarByID(carId); // по айдишнику ищем машину

      expect(getUserCarID.status()).toBe(200);

      const carData = await getUserCarID.json();
      expect(carData.status).toBe("ok");
      expect(carData.data.id).toBe(carId);
      expect(carData.data.brand).toBe(carBrand.title);
      expect(carData.data.model).toBe(carModel.title);
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
