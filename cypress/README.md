# Mobile Store

This repo contains e2e tests written in Cypress for a eommerce web app store. It contains the following features:

    1. Testing user registraton by simulating customer data input.
    2. Testing 'Add to Cart' functionality by simulating the product selection and adding the product to the cart 
    4. Validating the known total cost of purchases with the total cost generated by the system.
    5. Testing the checkout funtionality by simulating all the steps of the check out process like delivery address selection etc


## Help + Testing

The steps below will take you all the way through Cypress. It is assumed you have nothing installed except for node + git.

**If you get stuck, here is more help:**

* [Cypress Support](https://on.cypress.io/support)

### 1. Install Cypress

[Follow these instructions to install Cypress.](https://on.cypress.io/installing-cypress)

### 2. Fork this repo

If you want to experiment with running this project in Continuous Integration, you'll need to [fork](https://github.com/cypress-io/cypress-example-phonecat#fork-destination-box) it first.

After forking this project in `Github`, run these commands:

```bash
## clone this repo to a local directory
git clone https://github.com/<your-username>/cypress-example-phonecat.git

## cd into the cloned repo
cd cypress-example-phonecat

## install the node_modules
npm install

## start the local webserver
npm start
```

The `npm start` script will spawn a webserver on port `8000` which hosts the Phonecat app.

You can verify this by opening your browser and navigating to: [`http://localhost:8000`](http://localhost:8000)

You should see the Phonecat app up and running. We are now ready to run Cypress tests.

### 3. Add the project to Cypress

[Follow these instructions to add the project to Cypress.](https://on.cypress.io/writing-your-first-test)

### 4. Run in Continuous Integration

[Follow these instructions to run the tests in CI.](https://on.cypress.io/continuous-integration)

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/