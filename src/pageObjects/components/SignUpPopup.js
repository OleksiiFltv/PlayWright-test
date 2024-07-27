import BaseComponent from "../../components/BaseComponent";

export default class SignUpPopup extends BaseComponent {
  constructor(page) {
    super(page, page.locator("app-signup-modal"));
    this.nameInput = this.container.locator("#signupName");
    this.nameValidationLocator = this.nameInput.locator(" + .invalid-feedback");
    this.lastNameInput = this.container.locator("#signupLastName");
    this.lastNameValidationLocator = this.lastNameInput.locator(
      " + .invalid-feedback"
    );
    this.emailInput = this.container.locator("#signupEmail");
    this.emailValidationLocator = this.emailInput.locator(
      " + .invalid-feedback"
    );
    this.passwordInput = this.container.locator("#signupPassword");
    this.passwordValidationLocator = this.passwordInput.locator(
      " + .invalid-feedback"
    );
    this.repeatPasswordInput = this.container.locator("#signupRepeatPassword");
    this.repeatPasswordValidationLocator = this.repeatPasswordInput.locator(
      " + .invalid-feedback"
    );
    this.signUpBtn = this.container.locator(".btn-primary");
  }
  async fill({ name, lastName, email, password, repeatPassword }) {
    name && (await this.nameInput.fill(name));
    lastName && (await this.lastNameInput.fill(lastName));
    email && (await this.emailInput.fill(email));
    password && (await this.passwordInput.fill(password));
    repeatPassword && (await this.repeatPasswordInput.fill(repeatPassword));
  }

  async signUp({ name, lastName, email, password, repeatPassword }) {
    await this.fill({ name, lastName, email, password, repeatPassword });
    await this.signUpBtn.click();
  }
}
