import { test, expect } from "../fixtures/fixtures";
import * as metamask from "@synthetixio/synpress/commands/metamask";

test.describe("Search ERC20 tokens", () => {
  test.beforeEach(async ({ searchPage }) => {
    test.setTimeout(120000);
    await searchPage.navigate('https://qa-challange.netlify.app');
    await searchPage.connectWallet();
  });

  /*****
   *   Scenario: The user can search for an existing ERC20 token and see his balance and deposit history for the selected token.
        Given A user with metamask installed connected to sepolia network
        When the user accesses the app page
        And the user enters the address 0x9982f9A3bA28c34aD03737745d956EC0668ea440 in the input address field
        And the user clicks the Submit button
        Then the page shows the address balance for the selected token
        And the page shows the table of the deposit history for the selected token
   */

  test("The user can search for an existing ERC20 token and see his balance and deposit history for the selected token", async ({
    searchPage,
    depositHistoryPage,
  }) => {
    const inputField = await searchPage.page.locator('[data-test="InputAddress__Input__addressValue"]');
    await expect(inputField).toBeVisible();
    await inputField.fill('0x9982f9A3bA28c34aD03737745d956EC0668ea440');

    const submitButton = await searchPage.page.locator('[data-test="InputAddress__Button__submit"]');
    await submitButton.click();


    const tokenBalance =await depositHistoryPage.page.waitForSelector('span[data-test="TokenBalance__Div__balanceAmount"]', { state: 'attached', timeout:20000 });
    await depositHistoryPage.page.waitForTimeout(5000); 
    const cleanText = await tokenBalance.textContent()
    console.log("This is initial token balance in search-erc20 second test", cleanText)
    await expect(cleanText).not.toBeNull()

    const table = await depositHistoryPage.page.locator('table');
    await expect(table).toBeVisible();
    
    const headers = ["Transaction", "Depositor", "Token address", "Amount"]; 
    for (const header of headers) {
        await expect(table.locator(`th:has-text("${header}")`)).toBeVisible();
    }
    console.log("Table and headers verified successfully!");
    
    });//worked


  /******
   *  Scenario: The user enter an invalid ERC20 token address
        Given A user with metamask installed connected to sepolia network
        When the user accesses the app page
        And the user enters the address 0x9982f9A3bA28c in the input address field
        Then the submit button is disabled
   */
  test("The user enter an invalid ERC20 token address", async ({
    searchPage,
  }) => {
    const inputField = await searchPage.page.locator('[data-test="InputAddress__Input__addressValue"]');
    await expect(inputField).toBeVisible();
    await inputField.fill('0x9982f9A3bA28c');

    const submitButton = await searchPage.page.locator('[data-test="InputAddress__Button__submit"]');
    await expect(submitButton).toBeDisabled()

  });//worked


  /*******
   * Scenario: The user clicks the example token link and he will be able to see his balance and deposit history.
        Given A user with metamask installed connected to sepolia network
        When the user accesses the app page
        And the user clicks the example token link
        Then the page shows the address balance for the selected token
        And the page shows the table of the deposit history for the selected token
   */

  test("The user clicks the example token link and he will be able to see his balance and deposit history", async ({
    searchPage,
    depositHistoryPage
  }) => {
    const sampleToken = await searchPage.page.locator('[data-test="InputAddress__Span__exampleTokenLink"]');
    await expect(sampleToken).toBeVisible();
    await sampleToken.click();

    const tokenBalance =await depositHistoryPage.page.waitForSelector('span[data-test="TokenBalance__Div__balanceAmount"]', { state: 'attached', timeout:20000 });
    await depositHistoryPage.page.waitForTimeout(5000); 
    const cleanText = await tokenBalance.textContent()
    console.log("This is initial token balance in search erc20 third test", cleanText)
    await expect(cleanText).not.toBeNull()

    const table = await depositHistoryPage.page.locator('table');
    await expect(table).toBeVisible();
    
    const headers = ["Transaction", "Depositor", "Token address", "Amount"]; 
    for (const header of headers) {
        await expect(table.locator(`th:has-text("${header}")`)).toBeVisible();
    }
    console.log("Table and headers verified successfully!");

  });//worked
  
});
