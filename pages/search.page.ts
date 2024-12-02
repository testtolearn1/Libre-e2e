import { type Page, type Locator } from "@playwright/test";
import dotenv from "dotenv";
import * as metamask from "@synthetixio/synpress/commands/metamask";
dotenv.config();

export default class searchPage {
  [x: string]: any;

  readonly page: Page;
  readonly inputAddField: Locator;
  readonly submitButton: Locator;
  readonly sampleToken: Locator;
  readonly connectedAddress: Locator;
  readonly networkError: Locator;


  constructor(page: Page) {
    this.page = page;

    // Locators
    this.inputAddField = this.page.locator('data-test="InputAddress__Input__addressValue"');
    this.submitButton = this.page.locator('data-test="InputAddress__Button__submit"');
    this.sampleToken = this.page.locator('[data-test="InputAddress__Span__exampleTokenLink"]');
    this.connectedAddress = this.page.locator('data-test="MetaMaskConnector__Div__connect"')
    this.networkError = this.page.locator('.network-error')
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async connectWallet(): Promise<void> {
    await metamask.acceptAccess();
  }



}
