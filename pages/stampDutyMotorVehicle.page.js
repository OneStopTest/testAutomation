const { expect } = require('@playwright/test');
class StampDutyMotorVehiclePage {

    #checkOnlineButton;
    constructor(page) {
        this.page = page;
        this.#checkOnlineButton = this.page.getByRole('button', { name: 'Check online' });
    }

    async navigate() {
        await this.page.goto('https://www.service.nsw.gov.au/transaction/check-motor-vehicle-stamp-duty');
    }

    async validateCheckOnlineButton() {
        await expect(this.#checkOnlineButton).toBeVisible();
    }

    async clickCheckOnlineButton() {
        await this.#checkOnlineButton.click();
    }


}
module.exports = StampDutyMotorVehiclePage;