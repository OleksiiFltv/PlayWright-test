import { expect, test } from "@playwright/test";
import { VALID_CARS_BRANDS_RESPONSE } from "../fixtures/fetchCarData";

test("fetch car brands", async ({ request }) => {
  const response = await request.get("/api/cars/brands");
  const body = await response.json();
  expect(body).toEqual(VALID_CARS_BRANDS_RESPONSE);
});
