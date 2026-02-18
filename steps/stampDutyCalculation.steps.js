const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const StampDutyMotorVehiclePage  = require('../pages/stampDutyMotorVehicle.page');
const MotorVehicleDutyCalculatorPage = require('../pages/motorVehicleDutyCalculator.page');

Given('I navigate to the motor vehicle stamp duty page', async function () {
    this.stampDutyMotorVehiclePage= new StampDutyMotorVehiclePage(this.page);
    await this.stampDutyMotorVehiclePage.navigate();
});

When('I click Check online button', async function () {
    await this.stampDutyMotorVehiclePage.validateCheckOnlineButton();
    await this.stampDutyMotorVehiclePage.clickCheckOnlineButton();
    //await this.page.pause();
});

When('I see Motor Vehicle Duty Calculation Page', async function () {
    this.motorVehicleDutyCalculatorPage = new MotorVehicleDutyCalculatorPage(this.page);
    await this.motorVehicleDutyCalculatorPage.ValidateRevenueCalculatorText();
});


When('I select {string} radio button', async function (value) {    
    await this.motorVehicleDutyCalculatorPage.clickRegistrationRadioButton(value);
});

When('I enter {string} as the purchase price', async function (value) {
    console.log(`VALUE = ${value}`);
    await this.motorVehicleDutyCalculatorPage.enterPurchasePriceText(value);
});

When('I click the Calculate button', async function () {
    await this.motorVehicleDutyCalculatorPage.clickCalculateButton();
});

Then('I should see the Calculation popup with passenger vehicle registration as {string}', async function (registration) {
    await this.motorVehicleDutyCalculatorPage.validateMotorVehicleRegistrationText();
    await this.motorVehicleDutyCalculatorPage.hasPassengerVehicleRegistration(registration);
    
});

Then('I should see the purchase price as {string}', async function (purchasePrice) {
    await this.motorVehicleDutyCalculatorPage.hasPurchasePriceValue(purchasePrice);
    
});

Then('I should see the duty payable as {string}', async function (dutyPayable) {
    await this.motorVehicleDutyCalculatorPage.hasDutyPayable(dutyPayable);
});

Then('I should see the Note', async function () {
    await this.motorVehicleDutyCalculatorPage.hasNote();
});

Then('I should see the help text', async function () {
    await this.motorVehicleDutyCalculatorPage.hasHelpText();
});

Then('I should see the contact us link', async function () {
    await this.motorVehicleDutyCalculatorPage.hasContactUs();
});

When('I click the contact us page, I should see the Contact Us page in a new tab', async function () {
    await this.motorVehicleDutyCalculatorPage.clickContactUs();
});

Then('I validate the print icon and close the Calculation popup', async function () {
    await this.motorVehicleDutyCalculatorPage.validatePrintIconAndCloseDialog();
});

