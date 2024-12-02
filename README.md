## Steps to Run :

1. git clone git@github.com:testtolearn1/Libre-e2e.git
2. cd Libre-e2e
3. npm i
4. create/ use the one uploaded .env file with below details :
   - ENVIRONMENT_URL= https://qa-challange.netlify.app
   - METAMASK_SETUP_PRIVATE_KEY=a22e8ce08bb5c..............bf847e
   - METAMASK_SETUP_NETWORK=sepolia
   - METAMASK_SETUP_PASSWORD=Test@1234
5. Run the test using $ npm run test:headed (for headed tests running on browser)
   or $ npx playwright test
6. In order to run the github actions , add the variables given in .env to Repo-> settings-> Secrets and Variables -> Actions . Add Repository secrets and variables from .env
   Then go To Github Actions tab and select the workflow file and click on run workflow button.

7. Optional/ If required : npx playwright install --with-deps chromium (after step 3, if browsers are not installed)

## Note :

1.  When the main page loads the network state remians in 'Loading ...' with http as 304 Not modified . This should be updated to 200 with corresponsing state change .

    ```html
    <div id="__next">
      <div class="mx-4" data-test="AppPage__Div__content">
        <p class="text-white-700">Loading...</p>
      </div>
    </div>
    ```

2.  Also on page change , the api endpoints should also change , this helps for better testing , mocking the api req/responses and better proxying and debugging

3.  From a UI perspective , the app could be enhanced like having a disconnect button and others.

## Results :

Github wokflow run : https://github.com/testtolearn1/Libre-e2e/actions/runs/12118719808
