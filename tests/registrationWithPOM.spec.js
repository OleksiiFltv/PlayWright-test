import { expect, test } from "@playwright/test";
import MainPage from "../src/pageObjects/components/MainPage";

const user = {
  email: "aqa.a.filatov2@yopmail.com",
  name: "Alexey",
  secondName: "Filatov",
  pass: "Aaa!1234",
};

test.describe("Test Name field and Registration title", () => {
  let signUpModal;

  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
    signUpModal = await mainPage.body.clickSignUpButton();
  });

  test("Registration title", async ({ page }) => {
    await expect(page.locator("text=Registration")).toBeVisible();
  });

  test("Valid Name", async ({ page }) => {
    await signUpModal.fill({ name: user.name });
    await expect(signUpModal.nameValidationLocator).not.toBeVisible();
  });

  test("Empty Name", async ({ page }) => {
    await signUpModal.nameInput.focus();
    await signUpModal.nameInput.blur();

    await expect(signUpModal.nameValidationLocator).toHaveText("Name required");
    await expect(signUpModal.nameInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Add name with 1 letter", async ({ page }) => {
    await signUpModal.fill({ name: "Q" });
    await signUpModal.nameInput.blur();

    await expect(signUpModal.nameValidationLocator).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
    await expect(signUpModal.nameInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Add name with 21 letters", async ({ page }) => {
    await signUpModal.fill({ name: "Polyentolyekmongtainh" });
    await signUpModal.nameInput.blur();

    await expect(signUpModal.nameValidationLocator).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
    await expect(signUpModal.nameInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Add name with spaces", async ({ page }) => {
    const nameWithSpaces = "   Alex   ".trim();
    await signUpModal.fill({ nameWithSpaces });
    await signUpModal.nameInput.blur();

    await expect(signUpModal.nameValidationLocator).not.toBeVisible();
  });
});

test.describe("Test Last Name field ", () => {
  let signUpModal;

  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
    signUpModal = await mainPage.body.clickSignUpButton();
  });

  test("Valid Last Name", async ({ page }) => {
    await signUpModal.fill({ lastName: user.secondName });
    await expect(signUpModal.lastNameValidationLocator).not.toBeVisible();
  });

  test("Empty Last Name", async ({ page }) => {
    await signUpModal.lastNameInput.focus();
    await signUpModal.lastNameInput.blur();

    await expect(signUpModal.lastNameValidationLocator).toHaveText(
      "Last name required"
    );
    await expect(signUpModal.lastNameInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Add name with 1 letter", async ({ page }) => {
    await signUpModal.fill({ lastName: "Q" });
    await signUpModal.lastNameInput.blur();

    await expect(signUpModal.lastNameValidationLocator).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );
    await expect(signUpModal.lastNameInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Add name with 21 letters", async ({ page }) => {
    await signUpModal.fill({ lastName: "Polyentolyekmongtainh" });
    await signUpModal.lastNameInput.blur();

    await expect(signUpModal.lastNameValidationLocator).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );
    await expect(signUpModal.lastNameInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Add last name with spaces", async ({ page }) => {
    const lastNameWithSpaces = "   Filatov   ".trim();
    await signUpModal.fill(lastNameWithSpaces);
    await signUpModal.lastNameInput.blur();

    await expect(signUpModal.lastNameValidationLocator).not.toBeVisible();
  });
});

test.describe("Test email field ", () => {
  let signUpModal;

  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
    signUpModal = await mainPage.body.clickSignUpButton();
  });

  test("Valid  email", async ({ page }) => {
    await signUpModal.fill({ email: user.email });
    await expect(signUpModal.emailValidationLocator).not.toBeVisible();
  });

  test("Empty email", async ({ page }) => {
    await signUpModal.emailInput.focus();
    await signUpModal.emailInput.blur();

    await expect(signUpModal.emailValidationLocator).toHaveText(
      "Email required"
    );
    await expect(signUpModal.emailInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Email without @", async ({ page }) => {
    await signUpModal.fill({ email: "invalidMailgmail.com" });
    await signUpModal.passwordInput.focus();

    await expect(signUpModal.emailValidationLocator).toHaveText(
      "Email is incorrect"
    );
    await expect(signUpModal.emailInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Email without .com", async ({ page }) => {
    await signUpModal.fill({ email: "alex@gmail" });
    await signUpModal.passwordInput.focus();

    await expect(signUpModal.emailValidationLocator).toHaveText(
      "Email is incorrect"
    );
    await expect(signUpModal.emailInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Email with double @", async ({ page }) => {
    await signUpModal.fill({ email: "alex@@gmail.com" });
    await signUpModal.passwordInput.focus();

    await expect(signUpModal.emailValidationLocator).toHaveText(
      "Email is incorrect"
    );
    await expect(signUpModal.emailInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Email with two dots", async ({ page }) => {
    await signUpModal.fill({ email: "alex@gmail..com" });
    await signUpModal.passwordInput.focus();

    await expect(signUpModal.emailValidationLocator).toHaveText(
      "Email is incorrect"
    );
    await expect(signUpModal.emailInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Email with not all english letters", async ({ page }) => {
    await signUpModal.fill({ email: "alex@gmail.ком" });
    await signUpModal.passwordInput.focus();

    await expect(signUpModal.emailValidationLocator).toHaveText(
      "Email is incorrect"
    );
    await expect(signUpModal.emailInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Email without @gmail.com", async ({ page }) => {
    await signUpModal.fill({ email: "alex" });
    await signUpModal.passwordInput.focus();

    await expect(signUpModal.emailValidationLocator).toHaveText(
      "Email is incorrect"
    );
    await expect(signUpModal.emailInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Email with only @gmail.com", async ({ page }) => {
    await signUpModal.fill({ email: "@gmail.com" });
    await signUpModal.passwordInput.focus();

    await expect(signUpModal.emailValidationLocator).toHaveText(
      "Email is incorrect"
    );
    await expect(signUpModal.emailInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });
});

test.describe("Test password field ", () => {
  let signUpModal;

  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
    signUpModal = await mainPage.body.clickSignUpButton();
  });

  test("valid password 8 symbols, one integer, one capital, and one small letter", async ({
    page,
  }) => {
    await signUpModal.fill({ password: user.pass });
    await expect(signUpModal.passwordValidationLocator).not.toBeVisible();
  });

  test("valid password 15 symbols, one integer, one capital, and one small letter", async ({
    page,
  }) => {
    await signUpModal.fill({ password: "Aaa!12345678909" });
    await expect(signUpModal.passwordValidationLocator).not.toBeVisible();
  });

  test("Empty password", async ({ page }) => {
    await signUpModal.passwordInput.focus();
    await signUpModal.passwordInput.blur();

    await expect(signUpModal.passwordValidationLocator).toHaveText(
      "Password required"
    );
    await expect(signUpModal.passwordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Password with one integer", async ({ page }) => {
    await signUpModal.fill({ password: "1" });
    await signUpModal.passwordInput.blur();

    await expect(signUpModal.passwordValidationLocator).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await expect(signUpModal.passwordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Password with 16 symbols", async ({ page }) => {
    await signUpModal.fill({ password: "Aaa!123456789085" });
    await signUpModal.passwordInput.blur();

    await expect(signUpModal.passwordValidationLocator).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await expect(signUpModal.passwordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Password without capital letter", async ({ page }) => {
    await signUpModal.fill({ password: "aaa!1234" });
    await signUpModal.passwordInput.blur();

    await expect(signUpModal.passwordValidationLocator).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await expect(signUpModal.passwordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Password without small letter", async ({ page }) => {
    await signUpModal.fill({ password: "AAA!1234" });
    await signUpModal.passwordInput.blur();

    await expect(signUpModal.passwordValidationLocator).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await expect(signUpModal.passwordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Password without one integer", async ({ page }) => {
    await signUpModal.fill({ password: "Aaaaaaaa" });
    await signUpModal.passwordInput.blur();

    await expect(signUpModal.passwordValidationLocator).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await expect(signUpModal.passwordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });
});

test.describe("Test re-enter Password field ", () => {
  let signUpModal;

  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
    signUpModal = await mainPage.body.clickSignUpButton();
  });

  test("password matching 8 symbols", async ({ page }) => {
    await signUpModal.fill({ password: user.pass });
    await signUpModal.fill({ repeatPassword: user.pass });
    await signUpModal.repeatPasswordInput.blur();
    await expect(signUpModal.repeatPasswordValidationLocator).not.toBeVisible();
  });

  test("valid password 15 symbols, one integer, one capital, and one small letter", async ({
    page,
  }) => {
    await signUpModal.fill({ password: "Aaa!12345678909" });
    await signUpModal.fill({ repeatPassword: "Aaa!12345678909" });
    await signUpModal.repeatPasswordInput.blur();
    await expect(signUpModal.repeatPasswordValidationLocator).not.toBeVisible();
  });

  test("Re-enter password 1 symbol", async ({ page }) => {
    await signUpModal.fill({ password: user.pass });
    await signUpModal.fill({ repeatPassword: "1" });
    await signUpModal.repeatPasswordInput.blur();

    await expect(signUpModal.repeatPasswordValidationLocator).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await expect(signUpModal.repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter password 7 symbols", async ({ page }) => {
    await signUpModal.fill({ password: user.pass });
    await signUpModal.fill({ repeatPassword: "Aaa!123" });
    await signUpModal.repeatPasswordInput.blur();

    await expect(signUpModal.repeatPasswordValidationLocator).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await expect(signUpModal.repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter password 9 symbols", async ({ page }) => {
    await signUpModal.fill({ password: user.pass });
    await signUpModal.fill({ repeatPassword: "Aaa!12345" });
    await signUpModal.repeatPasswordInput.blur();

    await expect(signUpModal.repeatPasswordValidationLocator).toHaveText(
      "Passwords do not match"
    );
    await expect(signUpModal.repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter password 14 symbols", async ({ page }) => {
    await signUpModal.fill({ password: "Aaa!12345678909" });
    await signUpModal.fill({ repeatPassword: "Aaa!1234567890" });
    await signUpModal.repeatPasswordInput.blur();

    await expect(signUpModal.repeatPasswordValidationLocator).toHaveText(
      "Passwords do not match"
    );
    await expect(signUpModal.repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter password 16 symbols", async ({ page }) => {
    await signUpModal.fill({ password: "Aaa!12345678909" });
    await signUpModal.fill({ repeatPassword: "Aaa!123456789090" });
    await signUpModal.repeatPasswordInput.blur();

    await expect(signUpModal.repeatPasswordValidationLocator).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await expect(signUpModal.repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter without small letter", async ({ page }) => {
    await signUpModal.fill({ password: user.pass });
    await signUpModal.fill({ repeatPassword: "AAA!1234" });
    await signUpModal.repeatPasswordInput.blur();

    await expect(signUpModal.repeatPasswordValidationLocator).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await expect(signUpModal.repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter without capital letter", async ({ page }) => {
    await signUpModal.fill({ password: user.pass });
    await signUpModal.fill({ repeatPassword: "aaa!1234" });
    await signUpModal.repeatPasswordInput.blur();

    await expect(signUpModal.repeatPasswordValidationLocator).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await expect(signUpModal.repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Re-enter without integer", async ({ page }) => {
    await signUpModal.fill({ password: user.pass });
    await signUpModal.fill({ repeatPassword: "Aaaaaaaa" });
    await signUpModal.repeatPasswordInput.blur();

    await expect(signUpModal.repeatPasswordValidationLocator).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await expect(signUpModal.repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Passwords do not match", async ({ page }) => {
    await signUpModal.fill({ password: user.pass });
    await signUpModal.fill({ repeatPassword: "Aaa!1235" });
    await signUpModal.repeatPasswordInput.blur();

    await expect(signUpModal.repeatPasswordValidationLocator).toHaveText(
      "Passwords do not match"
    );
    await expect(signUpModal.repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });
});

test.describe("Test register button", () => {
  let signUpModal;

  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goTo();
    signUpModal = await mainPage.body.clickSignUpButton();
  });

  test("valid test for user registration", async ({ page }) => {
    const garageHeading = page.locator('h1:has-text("Garage")');
    await signUpModal.signUp({
      name: user.name,
      lastName: user.secondName,
      email: user.email,
      password: user.pass,
      repeatPassword: user.pass,
    });

    await expect(garageHeading).toBeVisible({
      timeout: 10_000,
    });
  });

  test("invalid name", async ({ page }) => {
    const registerBtn = page.getByRole("button", { name: "Register" });
    await signUpModal.fill({
      name: "A",
      lastName: user.secondName,
      email: user.email,
      password: user.pass,
      repeatPassword: user.pass,
    });
    await expect(registerBtn).toBeDisabled();
  });

  test("invalid last name", async ({ page }) => {
    const registerBtn = page.getByRole("button", { name: "Register" });
    await signUpModal.fill({
      name: user.name,
      lastName: "A",
      email: user.email,
      password: user.pass,
      repeatPassword: user.pass,
    });
    await expect(registerBtn).toBeDisabled();
  });

  test("invalid email", async ({ page }) => {
    const registerBtn = page.getByRole("button", { name: "Register" });
    await signUpModal.fill({
      name: user.name,
      lastName: user.secondName,
      email: "user.email",
      password: user.pass,
      repeatPassword: user.pass,
    });
    await expect(registerBtn).toBeDisabled();
  });

  test("invalid password", async ({ page }) => {
    const registerBtn = page.getByRole("button", { name: "Register" });
    await signUpModal.fill({
      name: user.name,
      lastName: user.secondName,
      email: user.email,
      password: "Aaa",
      repeatPassword: user.pass,
    });
    await expect(registerBtn).toBeDisabled();
  });

  test("invalid repeated password ", async ({ page }) => {
    const registerBtn = page.getByRole("button", { name: "Register" });
    await signUpModal.fill({
      name: user.name,
      lastName: user.secondName,
      email: user.email,
      password: user.pass,
      repeatPassword: "AA",
    });
    await expect(registerBtn).toBeDisabled();
  });
});
