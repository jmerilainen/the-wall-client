const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  e2e: {
    baseUrl: "http://localhost:4173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
