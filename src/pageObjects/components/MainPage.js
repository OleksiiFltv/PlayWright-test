import BasePage from "../BasePage";

export default class MainPage extends BasePage {
  constructor(page) {
    super(page, "/", page.locator(".header-link.-guest"));
  }
}
