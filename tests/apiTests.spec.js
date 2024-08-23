import { expect, test } from "@playwright/test";
import { request } from "https";

test.describe("API tests of adding cars", () => {
  test.beforeEach(async ({ request }) => {
    const loginResponse = await request.post("/api/auth/signin", {
      data: {
        email: "a.filatov1@yopmail.com",
        password: "Aaa!1234",
        remember: true,
      },
    });

    expect(loginResponse.status()).toBe(200);
  });

  test("Add car", async ({ request }) => {
    const requestBody = {
      carBrandId: 4,
      carModelId: 17,
      mileage: 15,
    };

    const response = await request.post("/api/cars", {
      data: requestBody,
    });
    const body = await response.json();

    expect(body.data, "Car should be created").toMatchObject(requestBody);
  });

  test("error 400, invalid mileage", async ({ request }) => {
    const requestBody = {
      carBrandId: 3,
      carModelId: 13,
      mileage: "Mileage",
    };

    const response = await request.post("/api/cars", {
      data: requestBody,
    });

    expect(response.status()).toBe(400);
  });

  test("error 404, use incorrect carModelId", async ({ request }) => {
    const requestBody = {
      carBrandId: 1,
      carModelId: 13,
      mileage: 33,
    };

    const response = await request.post("/api/cars", {
      data: requestBody,
    });

    expect(response.status()).toBe(404);
  });
});
