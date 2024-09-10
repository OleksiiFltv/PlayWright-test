import { expect, test } from "@playwright/test";

test.describe("delete car", () => {
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
    test(`create and delete car`, async ({ reqest }) => {
      const createRequestBody = {
        carBrandId: carBrand.id,
        carModelId: carModel.id,
        mileage: Math.floor(Math.random() * 100),
      };

      const createResponse = await carController.createCar(createRequestBody); // создаю машину
      expect(createResponse.status()).toBe(201);

      const createdCar = await createResponse.json();
      expect(createdCar.status).toBe("ok");

      const deleteResponse = await carController.deleteCar(createdCar.data.id); // удаляю машину
      expect(deleteResponse.status()).toBe(200);

      // проверяю машину у юзера

      const getResponse = await carsController.getCarById(createdCar.data.id);
      expect(getResponse.status()).toBe(404);
    });
  }
});
