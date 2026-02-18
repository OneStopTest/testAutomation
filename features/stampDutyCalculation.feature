
Feature: Stamp Duty Calculation for the Motor Vehicle
    @smoke
    Scenario Outline: Validate the stamp duty for the Motor Vehicle

        Given I navigate to the motor vehicle stamp duty page
        When I click Check online button
        When I see Motor Vehicle Duty Calculation Page
        When I select "<registration>" radio button
        When I enter "<purchasePrice>" as the purchase price
        When I click the Calculate button
        Then I should see the Calculation popup with passenger vehicle registration as "<registration>"
        Then I should see the purchase price as "<purchasePrice>"
        Then I should see the duty payable as "<dutyPayable>"
        Then I should see the Note
        Then I should see the help text
        Then I should see the contact us link
        When I click the contact us page, I should see the Contact Us page in a new tab
        Then I validate the print icon and close the Calculation popup

        Examples:
            | registration | purchasePrice | dutyPayable |
            | Yes          | 2,000         | $60.00      |



