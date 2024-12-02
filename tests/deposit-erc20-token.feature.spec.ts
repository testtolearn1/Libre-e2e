import { test, expect } from "../fixtures/fixtures";
import * as metamask from "@synthetixio/synpress/commands/metamask";


test.describe("Deposit ERC20 tokens", () => {
  test.beforeEach(async ({ searchPage , page }) => {
    test.setTimeout(600000);
    await searchPage.navigate('https://qa-challange.netlify.app');
    await searchPage.connectWallet();
  });
 


  /** *
    Scenario: The user try to deposit a ERC20 token with an empty balance
  Given A user with metamask installed connected to sepolia network
  When the user accesses the app page
  And the user enters the address 0xCD85B9a767eF2277E264A4B9A14a2deACAB82FfB in the input address field
  And the user clicks the Submit button
  Then the page shows the token balance 0
  And the deposit input shows an error
  And the deposit button is not visible
  **/

  test("The user try to deposit a ERC20 token with an empty balance", async ({
    searchPage,
    depositHistoryPage
  }) => {
    const inputField = await searchPage.page.locator('[data-test="InputAddress__Input__addressValue"]');
    await expect(inputField).toBeVisible();
    await inputField.fill('0xCD85B9a767eF2277E264A4B9A14a2deACAB82FfB');

    const submitButton = await searchPage.page.locator('[data-test="InputAddress__Button__submit"]');
    await expect(submitButton).toBeEnabled();
    await submitButton.click();


    const tokenBalance =await depositHistoryPage.page.waitForSelector('span[data-test="TokenBalance__Div__balanceAmount"]', { state: 'attached', timeout:20000 });
    await depositHistoryPage.page.waitForTimeout(5000); 
    const countText_new = await tokenBalance.textContent()
    const cleanText_new = countText_new?.trim().replace(/,/g, '');
    await expect(cleanText_new).toEqual('0')

    const depositError = await depositHistoryPage.page.locator('div[data-test="DepositToken__Div__error"]')
    const depositError_text = await depositError.textContent()
    console.log("The error message", depositError_text)
    await expect(depositError_text).toContain("The deposit is disabled")
    await expect(depositHistoryPage.page.locator('data-test="DepositToken__Button__deposit"')).not.toBeVisible()
  }); //worked


  /***
   Scenario: The user mint example token using the web application
    Given A user with metamask installed connected to sepolia network
    When the user accesses the app page
    And the user clicks the example token link
    And the user clicks the Get more tokens link
    And the user accepts the transaction
    Then the deposit button is visible
   */

  test("The user mint example token using the web application", async ({
    searchPage,
    depositHistoryPage,
  }) => {
    test.setTimeout(120000); // 2 minutes

    const sampleToken = await searchPage.page.locator('[data-test="InputAddress__Span__exampleTokenLink"]');
    await expect(sampleToken).toBeVisible();
    await sampleToken.click();

    const tokenBalance =await depositHistoryPage.page.waitForSelector('span[data-test="TokenBalance__Div__balanceAmount"]', { state: 'attached', timeout:20000 });
    await depositHistoryPage.page.waitForTimeout(5000); 
    const cleanText = await tokenBalance.textContent()
    console.log("This is initial token balance", cleanText)


    const mintMoreTokens = await depositHistoryPage.page.locator('[data-test="TokenBalance__Div__getMoreExampleTokensAction"]');
    await expect(mintMoreTokens).toBeEnabled();
    await mintMoreTokens.click();
    await metamask.confirmTransaction()
    await depositHistoryPage.page.waitForTimeout(30000); 

    const countText_new = await tokenBalance.textContent()
    await depositHistoryPage.page.waitForTimeout(5000); 
    const cleanText_new = countText_new?.trim().replace(/,/g, '');
    console.log("This is final after minting more tokens", cleanText_new)
    
    const depositTokenBtn =await depositHistoryPage.page.waitForSelector('button[data-test="DepositToken__Button__deposit"]', { state: 'attached' , timeout:20000});
    await expect(depositTokenBtn).toBeDefined()

}); // worked


  /***
   Scenario: The user deposit example token
    Given A user with metamask installed connected to sepolia network
    When the user accesses the app page
    And the user clicks the example token link
    And the deposit button is visible
    And the user enter the max amount of tokens in the amount field
    And the user clicks the deposit button
    And the user approve the deposit
    Then the page shows the token balance 0 
   
   */
  test("The user deposit example token", async ({
    searchPage,
    depositHistoryPage,
  }) => {
    const sampleToken = await searchPage.page.locator('[data-test="InputAddress__Span__exampleTokenLink"]');
    await expect(sampleToken).toBeVisible();
    await sampleToken.click();

    const tokenBalance =await depositHistoryPage.page.waitForSelector('span[data-test="TokenBalance__Div__balanceAmount"]', { state: 'attached', timeout:20000 });
    await depositHistoryPage.page.waitForTimeout(5000); 
    const cleanText = await tokenBalance.textContent()
    console.log("This is current token balance", cleanText)

    if (!cleanText || isNaN(Number(cleanText))) {
        throw new Error(`Invalid token balance retrieved: "${cleanText}"`);
      }

    const depositTokenField = await depositHistoryPage.page.locator('[data-test="DepositToken__Input__depositAmount"]')
    await depositTokenField.click()
    await depositTokenField.fill(cleanText)
    await depositHistoryPage.page.waitForTimeout(5000); 
    await depositTokenField.clear()  //remove
    await depositTokenField.fill('20')//remove
    await depositHistoryPage.page.waitForTimeout(5000); //remove


    const depositTokenBtn =await depositHistoryPage.page.waitForSelector('button[data-test="DepositToken__Button__deposit"]', { state: 'attached' , timeout:20000});
    await depositTokenBtn.click()
    await depositHistoryPage.page.waitForTimeout(5000); 
    await metamask.confirmPermissionToSpend()
    await depositHistoryPage.page.waitForTimeout(20000); 
    await metamask.confirmTransaction()
    await depositHistoryPage.page.waitForTimeout(20000); 


    const countText_new = await tokenBalance.textContent()
    await depositHistoryPage.page.waitForTimeout(5000); 
    const cleanText_new = countText_new?.trim().replace(/,/g, '');
    console.log("This is new balance after deposit", cleanText_new)
    
  }); //worked
  
});
