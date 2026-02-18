const { expect } = require('@playwright/test');
class MotorVehicleDutyCalculatorPage {
    #revenueNSWCalculatorsText;
    #revenueNSWCalculatorsValue;
    #registrationYesRadioButtonLocator;
    #registrationNoRadioButtonLocator;
    #purchasePriceText;
    #calculateButton;

    #motorVehicleRegistrationText;
    #printIcon;
    #passengerVehicleRegistration;
    #purchasePriceValue;
    #dutyPayable;
    #amountInAusDollar;
    #helpText;
    #contactUs;
    #calculationText;
    #closeButton


    constructor(page) {
        this.page = page;
        this.#revenueNSWCalculatorsText = this.page.locator('#skip');
        this.#registrationYesRadioButtonLocator = 'input[type="radio"][value="Y"]';
        this.#registrationNoRadioButtonLocator = 'input[type="radio"][value="N"]';
        this.#purchasePriceText = this.page.locator('#purchasePrice');
        this.#calculateButton = this.page.getByRole('button', { name: 'Calculate' });
        this.#revenueNSWCalculatorsValue = 'Revenue NSW calculators';

        this.#motorVehicleRegistrationText = this.page.locator('tr:has(h4:has-text("Motor vehicle registration"))');
        this.#printIcon = this.#motorVehicleRegistrationText.locator('a[href="javascript:window.print();"]');
        this.#passengerVehicleRegistration = this.page.locator('tr:has-text("Is this registration for a passenger vehicle?")').last();
        this.#purchasePriceValue = this.page.locator('tr:has-text("Purchase price or value")').last();
        this.#dutyPayable = this.page.locator('tr:has-text("Duty payable ")').last();
        this.#amountInAusDollar = this.page.locator('p:has-text("All amounts are in Australian dollars")');
        this.#helpText = this.page.locator('p:has-text("If you need help using this calculator,")').last();
        this.#contactUs = this.#helpText.locator('a[href*="contact"]');
        this.#calculationText = this.page.locator('h4.modal-title', { hasText: 'Calculation' });
        this.#closeButton = this.page.locator('button.close[data-dismiss="modal"]');
    }

    async ValidateRevenueCalculatorText() {
        await expect(this.#revenueNSWCalculatorsText).toHaveText(this.#revenueNSWCalculatorsValue);
    }

    async clickRegistrationRadioButton(option) {

        if (option == "Yes") {
            await this.page.click(this.#registrationYesRadioButtonLocator, { force: true });
        }
        else {
            await this.page.click(this.#registrationNoRadioButtonLocator, { force: true });
        }

    }

    async enterPurchasePriceText(value) {
        await this.#purchasePriceText.fill(value);
    }

    async clickCalculateButton() {
        await this.#calculateButton.click();
    }


    async validateMotorVehicleRegistrationText() {
        await expect(this.#motorVehicleRegistrationText).toBeVisible();
    }

    async hasPassengerVehicleRegistration(value) {
        console.log(value);
        await expect(this.#passengerVehicleRegistration).toContainText(value);
    }

    async hasPurchasePriceValue(value) {
        let unit = "$";
        let decimal = '.00'
        let exactValue = `${unit}${value}${decimal}`;
        console.log("EXACT VALUE =" + exactValue);
        await expect(this.#purchasePriceValue).toContainText(exactValue);
    }

    async hasDutyPayable(value) {
        console.log("DUTY ***" + value);
        await expect(this.#dutyPayable).toContainText(value);
    }

    async hasNote() {
        await expect(this.#amountInAusDollar).toBeVisible();
    }

    async hasHelpText() {
        await expect(this.#helpText).toBeVisible();
    }

    async hasContactUs() {
        await expect(this.#contactUs).toBeVisible();
    }

    async clickContactUs() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.#contactUs.click()
        ]);
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL(/.*contact.*/);
        await newPage.close();
    }

    async validatePrintIconAndCloseDialog() {
        if (await this.#calculationText.isVisible()) {
            await expect(this.#printIcon).toBeVisible();
            // Click the Close button
            await this.#closeButton.click();
        }
        else {
            console.log('Unparsed HTML');
            // Verify modal is gone
            await expect(this.#calculationText).toHaveCount(0);
        }
    }




}
module.exports = MotorVehicleDutyCalculatorPage;