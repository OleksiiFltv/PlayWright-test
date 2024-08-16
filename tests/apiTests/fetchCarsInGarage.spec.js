import { expect, test } from "@playwright/test";

test("fetch cars in garage", async ({ request }) => {
  const loginResponse = await request.post("/api/auth/signin", {
    data: {
      email: "a.filatov1@yopmail.com",
      password: "Aaa!1234",
      remember: true,
    },
  });
  expect(loginResponse.status()).toBe(200);

  const response = await request.get("/api/cars");
  const body = await response.json();
  expect({
    status: "ok",
    data: {
      id: expect.any(Number),
      carBrandId: expect.any(Number),
      carModelId: expect.any(Number),
      initialMileage: expect.any(Number),
      updatedMileageAt: expect.any(String),
      carCreatedAt: expect.any(String),
      mileage: expect.any(Number),
      brand: expect.any(String),
      model: expect.any(String),
      logo: expect.any(String),
    },
  });
});
