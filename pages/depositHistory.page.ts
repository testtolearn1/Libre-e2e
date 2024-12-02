import { type Page, type Locator } from "@playwright/test";
import SearchPage from "./search.page";


export default class DepositHistoryPage extends SearchPage {
  readonly depositTokenField: Locator;
  readonly depositButton: Locator;
  readonly depositError: Locator;
  readonly tokenBalance: Locator;
  readonly selectAnothertoken: Locator;
  readonly mintMoreToken: Locator;



  constructor(page: Page) {
    super(page);


    // Locators
    this.depositTokenField = this.page.locator('data-test="DepositToken__Input__depositAmount"');
    this.depositButton = this.page.locator('data-test="DepositToken__Button__deposit"');
    this.depositError = this.page.locator('[data-test="DepositToken__Div__error"');
    this.tokenBalance = this.page.locator('data-test="TokenBalance__Div__balanceAmount"')
    this.selectAnothertoken = this.page.getByText('Select another token')
    this.mintMoreToken = this.page.locator('data-test="TokenBalance__Div__getMoreExampleTokensAction"')
  }

  
}
