import { expect, test } from "@playwright/test";
import { request } from "https";
import { CAR_BRANDS } from "../../src/data/carBrand";
import { CAR_MODELS } from "../../src/data/carModels";

test.describe.only("add all cars and expenses", () => {
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

  // test.describe(`Create AUDI cars`, () => {
  //   const carBrand = CAR_BRANDS.Audi;
  //   for (const carModel of Object.values(CAR_MODELS.AUDI)) {
  //     test(`Create car ${carBrand.title} ${carModel.title}`, async ({
  //       request,
  //     }) => {
  //       const requestBody = {
  //         carBrandId: carBrand.id,
  //         carModelId: carModel.id,
  //         mileage: Math.floor(Math.random() * 100),
  //       };

  //       const response = await request.post("/api/cars", {
  //         data: requestBody,
  //       });

  //       const actualBody = await response.json();

  //       expect(response.status()).toBe(201);
  //       expect(actualBody).toEqual({
  //         status: "ok",
  //         data: {
  //           id: expect.any(Number),
  //           carBrandId: requestBody.carBrandId,
  //           carModelId: requestBody.carModelId,
  //           initialMileage: requestBody.mileage,
  //           updatedMileageAt: expect.any(String),
  //           carCreatedAt: expect.any(String),
  //           mileage: requestBody.mileage,
  //           brand: carBrand.title,
  //           model: carModel.title,
  //           logo: carBrand.logoFilename,
  //         },
  //       });
  //     });
  //   }
  // });
  // test.describe(`Create BMW cars`, () => {
  //   const carBrand = CAR_BRANDS.BMW;
  //   for (const carModel of Object.values(CAR_MODELS.BMW)) {
  //     test(`Create car ${carBrand.title} ${carModel.title}`, async ({
  //       request,
  //     }) => {
  //       const requestBody = {
  //         carBrandId: carBrand.id,
  //         carModelId: carModel.id,
  //         mileage: Math.floor(Math.random() * 100),
  //       };

  //       const response = await request.post("/api/cars", {
  //         data: requestBody,
  //       });

  //       const actualBody = await response.json();

  //       expect(response.status()).toBe(201);
  //       expect(actualBody).toEqual({
  //         status: "ok",
  //         data: {
  //           id: expect.any(Number),
  //           carBrandId: requestBody.carBrandId,
  //           carModelId: requestBody.carModelId,
  //           initialMileage: requestBody.mileage,
  //           updatedMileageAt: expect.any(String),
  //           carCreatedAt: expect.any(String),
  //           mileage: requestBody.mileage,
  //           brand: carBrand.title,
  //           model: carModel.title,
  //           logo: carBrand.logoFilename,
  //         },
  //       });
  //     });
  //   }
  // });
  // test.describe(`Create Ford cars`, () => {
  //   const carBrand = CAR_BRANDS.Ford;
  //   for (const carModel of Object.values(CAR_MODELS.FORD)) {
  //     test(`Create car ${carBrand.title} ${carModel.title}`, async ({
  //       request,
  //     }) => {
  //       const requestBody = {
  //         carBrandId: carBrand.id,
  //         carModelId: carModel.id,
  //         mileage: Math.floor(Math.random() * 100),
  //       };

  //       const response = await request.post("/api/cars", {
  //         data: requestBody,
  //       });

  //       const actualBody = await response.json();

  //       expect(response.status()).toBe(201);
  //       expect(actualBody).toEqual({
  //         status: "ok",
  //         data: {
  //           id: expect.any(Number),
  //           carBrandId: requestBody.carBrandId,
  //           carModelId: requestBody.carModelId,
  //           initialMileage: requestBody.mileage,
  //           updatedMileageAt: expect.any(String),
  //           carCreatedAt: expect.any(String),
  //           mileage: requestBody.mileage,
  //           brand: carBrand.title,
  //           model: carModel.title,
  //           logo: carBrand.logoFilename,
  //         },
  //       });
  //     });
  //   }
  // });
  // test.describe(`Create Porsche cars`, () => {
  //   const carBrand = CAR_BRANDS.Porsche;
  //   for (const carModel of Object.values(CAR_MODELS.PORSCHE)) {
  //     test(`Create car ${carBrand.title} ${carModel.title}`, async ({
  //       request,
  //     }) => {
  //       const requestBody = {
  //         carBrandId: carBrand.id,
  //         carModelId: carModel.id,
  //         mileage: Math.floor(Math.random() * 100),
  //       };

  //       const response = await request.post("/api/cars", {
  //         data: requestBody,
  //       });

  //       const actualBody = await response.json();

  //       expect(response.status()).toBe(201);
  //       expect(actualBody).toEqual({
  //         status: "ok",
  //         data: {
  //           id: expect.any(Number),
  //           carBrandId: requestBody.carBrandId,
  //           carModelId: requestBody.carModelId,
  //           initialMileage: requestBody.mileage,
  //           updatedMileageAt: expect.any(String),
  //           carCreatedAt: expect.any(String),
  //           mileage: requestBody.mileage,
  //           brand: carBrand.title,
  //           model: carModel.title,
  //           logo: carBrand.logoFilename,
  //         },
  //       });
  //     });
  //   }
  // });
  // test.describe(`Create Fiat cars`, () => {
  //   const carBrand = CAR_BRANDS.Fiat;
  //   for (const carModel of Object.values(CAR_MODELS.FIAT)) {
  //     test(`Create car ${carBrand.title} ${carModel.title}`, async ({
  //       request,
  //     }) => {
  //       const requestBody = {
  //         carBrandId: carBrand.id,
  //         carModelId: carModel.id,
  //         mileage: Math.floor(Math.random() * 100),
  //       };

  //       const response = await request.post("/api/cars", {
  //         data: requestBody,
  //       });

  //       const actualBody = await response.json();

  //       expect(response.status()).toBe(201);
  //       expect(actualBody).toEqual({
  //         status: "ok",
  //         data: {
  //           id: expect.any(Number),
  //           carBrandId: requestBody.carBrandId,
  //           carModelId: requestBody.carModelId,
  //           initialMileage: requestBody.mileage,
  //           updatedMileageAt: expect.any(String),
  //           carCreatedAt: expect.any(String),
  //           mileage: requestBody.mileage,
  //           brand: carBrand.title,
  //           model: carModel.title,
  //           logo: carBrand.logoFilename,
  //         },
  //       });
  //     });
  //   }
  // });
  test("add expenses for AUDI", async ({ request }) => {
    const requestBody = {
      carId: 185826,
      reportedAt: "2024-08-15",
      mileage: 111,
      liters: 11,
      totalCost: 11,
      forceMileage: false,
    };

    const response = await request.post("/api/expenses", {
      data: requestBody,
    });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.data).toEqual({
      carId: requestBody.carId,
      reportedAt: requestBody.reportedAt,
      liters: requestBody.liters,
      id: expect.any(Number),
      mileage: requestBody.mileage,
      totalCost: requestBody.totalCost,
    });
  });
});
