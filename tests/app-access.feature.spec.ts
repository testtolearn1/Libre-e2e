import { test, expect } from "../fixtures/fixtures";
import * as metamask from "@synthetixio/synpress/commands/metamask";

test.describe("The application works only with the Sepolia network", () => {
  test.beforeEach(async ({ searchPage }) => {
    test.setTimeout(120000);
    await searchPage.navigate('https://qa-challange.netlify.app');
    await searchPage.connectWallet();
  });


  /***
   *   Scenario: The user accesses the page with Metamask connected to Sepolia network
        Given A user with metamask installed connected to sepolia network
        When the user accesses the app page
        And the user accepts notifications
        Then the page shows the account address
        And the page shows the input address field
        And the page doesn't show a network error message

   */

  test("The user accesses the page with Metamask connected to Sepolia network", async ({
    searchPage,
  }) => {
    const connectedAccountAdd = await searchPage.page.locator('[data-test="MetaMaskConnector__Div__connect"]');
    await expect(connectedAccountAdd).toBeVisible();

    const inputField = await searchPage.page.locator('[data-test="InputAddress__Input__addressValue"]');
    await expect(inputField).toBeVisible();

    const metamaskNotConnectedError = await searchPage.page.locator('[data-test="MetaMaskConnector__Div__error"]');
    await expect(metamaskNotConnectedError).not.toBeVisible();

  }); //worked


  /***
   * Scenario: The user accesses the page with Metamask connected to Mainnet network
        Given A user with metamask installed connected to mainnet network
        When the user accesses the app page
        Then the page shows a network error message
        And the page shows the switch network button
        And the page doesn't show the input address field
   */

  test("The user accesses the page with Metamask connected to Mainnet network", async ({
    searchPage,
  }) => {
    await metamask.changeNetwork("ethereum");

    const metamaskNotConnectedError = await searchPage.page.locator('[data-test="MetaMaskConnector__Div__error"]');
    await expect(metamaskNotConnectedError).toBeVisible();
    
    const connectMMtoSepoliaBtn = await searchPage.page.locator('[data-test="MetaMaskConnector__Button__connect"]');
    await expect(connectMMtoSepoliaBtn).toBeVisible();


    const inputField = await searchPage.page.locator('[data-test="InputAddress__Input__addressValue"]');
    await expect(inputField).not.toBeVisible();
    
  });//worked


  /*****
   * Scenario: The user accesses the page with Metamask connected to Mainnet network and uses the switch network button
        Given A user with metamask installed connected to mainnet network
        When the user accesses the app page
        And the user clicks the switch network button
        And the user confirms the switch network
        Then the page shows the input address field
        And the page doesn't show a network error message
   */
  test("The user accesses the page with Metamask connected to Mainnet network and uses the switch network button", async ({
    searchPage,
  }) => {
    await metamask.changeNetwork("ethereum"); //mainnet network

    const metamaskNotConnectedError = await searchPage.page.locator('[data-test="MetaMaskConnector__Div__error"]');
    await expect(metamaskNotConnectedError).toBeVisible();
    
    const connectMMtoSepoliaBtn = await searchPage.page.locator('[data-test="MetaMaskConnector__Button__connect"]');
    await expect(connectMMtoSepoliaBtn).toBeVisible();


    const inputField = await searchPage.page.locator('[data-test="InputAddress__Input__addressValue"]');
    await expect(inputField).not.toBeVisible();

    await connectMMtoSepoliaBtn.click()
    await metamask.allowToSwitchNetwork()
    //reload if required
    await searchPage.page.waitForTimeout(10000); 
    await expect(inputField).toBeVisible();
    await expect(metamaskNotConnectedError).not.toBeVisible();

  });//worked
  
});
