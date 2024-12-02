Steps to Run :

1. git clone
2. cd repo
3. npm i
4. create/ use the one uploaded .env file with below details
   ENVIRONMENT_URL= https://qa-challange.netlify.app
   METAMASK_SETUP_PRIVATE_KEY=
   METAMASK_SETUP_NETWORK=sepolia
   METAMASK_SETUP_PASSWORD=
5. Run the test using npm run test:headed (for headed tests running on browser)
6. In order to run the github actions , add the variables given in .env to Repo-> settings-> Secrets and Variables -> Actions . Add Repository secrets and variables from .env
   The go To Github Actions tab and select the workflow file and click on run workflow

Note :

1. The
