const { Before, After, setWorldConstructor } = require('@cucumber/cucumber');
const { CustomWorld } = require('../fixtures/custom.fixture');

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.launchBrowser();
});

After(async function () {
  await this.closeBrowser();
});
