const { chromium } = require('@playwright/test');
const { Tools }= require('../utilities/tools');

class CustomWorld {
  async launchBrowser() {
    this.browser = await chromium.launch({
      headless: true,
      args: ['--start-maximized'],
    });
    this.context = await this.browser.newContext({ viewport: null });
    this.page = await this.context.newPage();
    this.tools = new Tools(this.page);
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

module.exports = { CustomWorld };
