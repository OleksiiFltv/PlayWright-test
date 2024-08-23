// import { expect, test } from "@playwright/test";
// import { CAR_BRANDS } from "../../../src/data/carBrand";
// import CarsController from "../../../src/controllers/CarsController";
// import { CAR_MODELS } from "../../../src/data/carModels";

// test.describe("get user cars by id", () => {
//   let carController;
//   const carBrand = CAR_BRANDS.Porsche;
//   test.beforeAll(async ({ request }) => {
//     const loginResponse = await request.post("/auth/signin", {
//       data: {
//         email: "a.filatov8@yopmail.com",
//         password: "Aaa!1234",
//         remember: true,
//       },
//     });

//     console.log("Login Response Status:", loginResponse.status());
//     console.log("Login Response Body:", await loginResponse.text());

//     expect(loginResponse.status()).toBe(200);
//   });

//   carController = new CarsController(request);
//   for (const carModel of Object.values(CAR_MODELS.Porsche)) {
//     test(`create a car ${carBrand.title} ${carModel.title}`);
//   }
// });
