import SignUpPopup from "../pageObjects/components/SignUpPopup";
import BaseComponent from "./BaseComponent";

export default class Body extends BaseComponent {
  constructor(page) {
    super(page);
    this.signUpBtn = page.locator(".btn-primary");
  }

  async clickSignUpButton() {
    await this.signUpBtn.click();
    return new SignUpPopup(this._page);
  }
}
