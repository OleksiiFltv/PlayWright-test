import { expect } from "@playwright/test";
import Body from "../components/Body";

export default class BasePage {
  constructor(page, url, waitPageLocator) {
    this._page = page;
    this._url = url;
    this._waitPageLocator = waitPageLocator;
    this.body = new Body(page);
  }
  async goTo() {
    await this._page.goto(this._url);
    await expect(this._waitPageLocator).toBeVisible();
  }
}
