import { expect, test } from "@playwright/test";

const user = {
  email: "aqa.a.filatov1@yopmail.com",
  name: "Alexey",
  secondName: "Filatov",
  pass: "Aaa!1234",
};

test.describe("Test Name field and Registration title", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.click(".hero-descriptor_btn");
  });

  test("Registration title", async ({ page }) => {
    await expect(page.locator("text=Registration")).toBeVisible();
  });

  test("Add name", async ({ page }) => {
    const nameInput = page.locator("#signupName");
    const invalidFeedback = nameInput.locator(".. >> .invalid-feedback");
    await nameInput.fill(user.name);
    await nameInput.blur();

    await expect(invalidFeedback).not.toBeVisible();
  });

  test("Registration title, error in empty Name field and border color", async ({
    page,
  }) => {
    const nameInput = page.locator("#signupName");
    const invalidFeedback = nameInput.locator(".. >> .invalid-feedback");
    await expect(page.locator("text=Registration")).toBeVisible();
    await nameInput.focus();
    await nameInput.blur();

    await expect(invalidFeedback).toHaveText("Name required");

    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Add name without letters", async ({ page }) => {
    const nameInput = page.locator("#signupName");
    const invalidFeedback = nameInput.locator(".. >> .invalid-feedback");
    await nameInput.fill("    ");
    await nameInput.blur();

    await expect(invalidFeedback).toHaveText("Name is invalid");

    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
  test("Add name with 1 letter", async ({ page }) => {
    const nameInput = page.locator("#signupName");
    const invalidFeedback = nameInput.locator(".. >> .invalid-feedback");
    await nameInput.fill("S");
    await nameInput.blur();

    await expect(invalidFeedback).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );

    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
  test("Add name with 21 letters", async ({ page }) => {
    const nameInput = page.locator("#signupName");
    const invalidFeedback = nameInput.locator(".. >> .invalid-feedback");
    await nameInput.fill("Polyentolyekmongtainh");
    await nameInput.blur();

    await expect(invalidFeedback).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );

    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
  test("Add name with spaces", async ({ page }) => {
    const nameWithSpaces = "   Alex   ".trim();
    const nameInput = page.locator("#signupName");
    const invalidFeedback = nameInput.locator(".. >> .invalid-feedback");
    await nameInput.fill(nameWithSpaces);
    await nameInput.blur();

    await expect(invalidFeedback).not.toBeVisible();
  });
});

test.describe("Test Last Name field", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.click(".hero-descriptor_btn");
  });

  test("Add Last name", async ({ page }) => {
    const lastNameInput = page.locator("#signupLastName");
    const invalidFeedback = lastNameInput.locator(".. >> .invalid-feedback");
    await lastNameInput.fill(user.secondName);
    await lastNameInput.blur();

    await expect(invalidFeedback).not.toBeVisible();
  });
  test("error in empty Last Name field and border color", async ({ page }) => {
    const lastNameInput = page.locator("#signupLastName");
    const invalidFeedback = lastNameInput.locator(".. >> .invalid-feedback");
    await lastNameInput.focus();
    await lastNameInput.blur();

    await expect(invalidFeedback).toHaveText("Last name required");

    await expect(lastNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Add Last name without letters", async ({ page }) => {
    const lastNameInput = page.locator("#signupLastName");
    const invalidFeedback = lastNameInput.locator(".. >> .invalid-feedback");
    await lastNameInput.fill("    ");
    await lastNameInput.blur();

    await expect(invalidFeedback).toHaveText("Last name is invalid");

    await expect(lastNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Add Last name with 1 letter", async ({ page }) => {
    const lastNameInput = page.locator("#signupLastName");
    const invalidFeedback = lastNameInput.locator(".. >> .invalid-feedback");
    await lastNameInput.fill("D");
    await lastNameInput.blur();

    await expect(invalidFeedback).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );

    await expect(lastNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Add last name with 21 letters", async ({ page }) => {
    const lastNameInput = page.locator("#signupLastName");
    const invalidFeedback = lastNameInput.locator(".. >> .invalid-feedback");
    await lastNameInput.fill("Polyentolyekmongtainh");
    await lastNameInput.blur();

    await expect(invalidFeedback).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );

    await expect(lastNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Add name with spaces", async ({ page }) => {
    const lastNameWithSpaces = "   Filatov   ".trim();
    const lastNameInput = page.locator("#signupLastName");
    const invalidFeedback = lastNameInput.locator(".. >> .invalid-feedback");
    await lastNameInput.fill(lastNameWithSpaces);
    await nameInput.blur();

    await expect(invalidFeedback).not.toBeVisible();
  });
});
test.describe("Email field", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.click(".hero-descriptor_btn");
  });

  test("valid Email", async ({ page }) => {
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const invalidFeedback = emailInput.locator(".. >> .invalid-feedback");
    await emailInput.fill(user.email);
    await passwordInput.click();
    await expect(invalidFeedback).not.toBeVisible();
  });

  test("Email without @", async ({ page }) => {
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const invalidFeedback = emailInput.locator(".. >> .invalid-feedback");
    await emailInput.fill("invalidMailgmail.com");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText("Email is incorrect");

    await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Email without .com", async ({ page }) => {
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const invalidFeedback = emailInput.locator(".. >> .invalid-feedback");
    await emailInput.fill("alex@gmail");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText("Email is incorrect");

    await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Email with double @", async ({ page }) => {
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const invalidFeedback = emailInput.locator(".. >> .invalid-feedback");
    await emailInput.fill("alex@@gmail.com");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText("Email is incorrect");

    await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Email with two dots", async ({ page }) => {
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const invalidFeedback = emailInput.locator(".. >> .invalid-feedback");
    await emailInput.fill("alex@gmail..com");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText("Email is incorrect");

    await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
  test("Email with not all english letters", async ({ page }) => {
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const invalidFeedback = emailInput.locator(".. >> .invalid-feedback");
    await emailInput.fill("alex@gmail.ком");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText("Email is incorrect");

    await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Email without @gmail.com", async ({ page }) => {
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const invalidFeedback = emailInput.locator(".. >> .invalid-feedback");
    await emailInput.fill("alex");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText("Email is incorrect");

    await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
  test("Email with only @gmail.com", async ({ page }) => {
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const invalidFeedback = emailInput.locator(".. >> .invalid-feedback");
    await emailInput.fill("@gmail.com");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText("Email is incorrect");

    await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
});
test.describe("Password field", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.click(".hero-descriptor_btn");
  });

  test("valid password 8 symbols, one integer, one capital, and one small letter", async ({
    page,
  }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = passwordInput.locator(".. >> .invalid-feedback");
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.click();
    await expect(invalidFeedback).not.toBeVisible();
  });

  test("valid password 15 symbols, one integer, one capital, and one small letter", async ({
    page,
  }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = passwordInput.locator(".. >> .invalid-feedback");
    await passwordInput.fill("Aaa!12345678909");
    await repeatPasswordInput.click();
    await expect(invalidFeedback).not.toBeVisible();
  });

  test("Password with one integer", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = passwordInput.locator(".. >> .invalid-feedback");
    await passwordInput.fill("1");
    await repeatPasswordInput.click();
    await expect(invalidFeedback).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Password with 16 symbols", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = passwordInput.locator(".. >> .invalid-feedback");
    await passwordInput.fill("Aaa!123456789085");
    await repeatPasswordInput.click();
    await expect(invalidFeedback).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Password without capital letter", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = passwordInput.locator(".. >> .invalid-feedback");
    await passwordInput.fill("aaa!1234");
    await repeatPasswordInput.click();
    await expect(invalidFeedback).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Password without small letter", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = passwordInput.locator(".. >> .invalid-feedback");
    await passwordInput.fill("AAA!1234");
    await repeatPasswordInput.click();
    await expect(invalidFeedback).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Password without one integer", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = passwordInput.locator(".. >> .invalid-feedback");
    await passwordInput.fill("Aaaaaaaa");
    await repeatPasswordInput.click();
    await expect(invalidFeedback).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
});

test.describe("re-enter Password field", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.click(".hero-descriptor_btn");
  });

  test("password matching 8 symbols", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = repeatPasswordInput.locator(
      ".. >> .invalid-feedback"
    );
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.fill(user.pass);
    await passwordInput.click();
    await expect(invalidFeedback).not.toBeVisible();
  });

  test("password matching 15 symbols", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = repeatPasswordInput.locator(
      ".. >> .invalid-feedback"
    );
    await passwordInput.fill("Aaa!12345678909");
    await repeatPasswordInput.fill("Aaa!12345678909");
    await passwordInput.click();
    await expect(invalidFeedback).not.toBeVisible();
  });

  test("Re-enter password 1 symbol", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = repeatPasswordInput.locator(
      ".. >> .invalid-feedback"
    );
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.fill("A");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter password 7 symbols", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = repeatPasswordInput.locator(
      ".. >> .invalid-feedback"
    );
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.fill("Aaa!123");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter password 9 symbols", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = repeatPasswordInput.locator(
      ".. >> .invalid-feedback"
    );
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.fill("Aaa!12345");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText("Passwords do not match");

    await expect(repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter password 14 symbols", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = repeatPasswordInput.locator(
      ".. >> .invalid-feedback"
    );
    await passwordInput.fill("Aaa!12345678909");
    await repeatPasswordInput.fill("Aaa!1234567890");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText("Passwords do not match");

    await expect(repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter password 16 symbols", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = repeatPasswordInput.locator(
      ".. >> .invalid-feedback"
    );
    await passwordInput.fill("Aaa!12345678909");
    await repeatPasswordInput.fill("Aaa!123456789091");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter without small letter", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = repeatPasswordInput.locator(
      ".. >> .invalid-feedback"
    );
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.fill("AAA!1234");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter without capital letter", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = repeatPasswordInput.locator(
      ".. >> .invalid-feedback"
    );
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.fill("aaa!1234");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter without integer", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = repeatPasswordInput.locator(
      ".. >> .invalid-feedback"
    );
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.fill("Aaaaaaaa");
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Passwords do not match", async ({ page }) => {
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const invalidFeedback = repeatPasswordInput.locator(
      ".. >> .invalid-feedback"
    );
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.fill("Aaa!1235");
    // await repeatPasswordInput.blur;
    await passwordInput.click();
    await expect(invalidFeedback).toHaveText("Passwords do not match");

    await expect(repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });
});

test.describe("Test register button", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.click(".hero-descriptor_btn");
  });

  test("valid test for user registration", async ({ page }) => {
    const nameInput = page.locator("#signupName");
    const lastNameInput = page.locator("#signupLastName");
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const registerBtn = page.getByRole("button", { name: "Register" });
    const garageHeading = page.locator('h1:has-text("Garage")');
    await nameInput.fill(user.name);
    await lastNameInput.fill(user.secondName);
    await emailInput.fill(user.email);
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.fill(user.pass);
    await registerBtn.click();
    await expect(garageHeading).toBeVisible({
      timeout: 10_000,
    });
  });

  test("invalid name", async ({ page }) => {
    const nameInput = page.locator("#signupName");
    const lastNameInput = page.locator("#signupLastName");
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const registerBtn = page.getByRole("button", { name: "Register" });
    await nameInput.fill("A");
    await lastNameInput.fill(user.secondName);
    await emailInput.fill(user.email);
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.fill(user.pass);
    await expect(registerBtn).toBeDisabled();
  });

  test("invalid Last name", async ({ page }) => {
    const nameInput = page.locator("#signupName");
    const lastNameInput = page.locator("#signupLastName");
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const registerBtn = page.getByRole("button", { name: "Register" });
    await nameInput.fill(user.name);
    await lastNameInput.fill("F");
    await emailInput.fill(user.email);
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.fill(user.pass);
    await expect(registerBtn).toBeDisabled();
  });

  test("invalid email", async ({ page }) => {
    const nameInput = page.locator("#signupName");
    const lastNameInput = page.locator("#signupLastName");
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const registerBtn = page.getByRole("button", { name: "Register" });
    await nameInput.fill(user.name);
    await lastNameInput.fill(user.secondName);
    await emailInput.fill("email");
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.fill(user.pass);
    await expect(registerBtn).toBeDisabled();
  });

  test("invalid password", async ({ page }) => {
    const nameInput = page.locator("#signupName");
    const lastNameInput = page.locator("#signupLastName");
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const registerBtn = page.getByRole("button", { name: "Register" });
    await nameInput.fill(user.name);
    await lastNameInput.fill(user.secondName);
    await emailInput.fill(user.email);
    await passwordInput.fill("A");
    await repeatPasswordInput.fill(user.pass);
    await expect(registerBtn).toBeDisabled();
  });

  test("invalid repeated password", async ({ page }) => {
    const nameInput = page.locator("#signupName");
    const lastNameInput = page.locator("#signupLastName");
    const emailInput = page.locator("#signupEmail");
    const passwordInput = page.locator("#signupPassword");
    const repeatPasswordInput = page.locator("#signupRepeatPassword");
    const registerBtn = page.getByRole("button", { name: "Register" });
    await nameInput.fill(user.name);
    await lastNameInput.fill(user.secondName);
    await emailInput.fill(user.email);
    await passwordInput.fill(user.pass);
    await repeatPasswordInput.fill("Aaa");
    await expect(registerBtn).toBeDisabled();
  });
});
