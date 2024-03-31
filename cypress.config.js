const cucumber = require('cypress-cucumber-preprocessor').default
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    url:"https://rahulshettyacademy.com/"
  },
  e2e: {
    watchForFileChanges:false,
    defaultCommandTimeout:6000,
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())    

    },
    specPattern: "cypress/e2e/BDD/*.feature"
  },
});
