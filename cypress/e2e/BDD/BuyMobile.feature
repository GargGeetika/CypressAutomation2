Feature: buy Mobile from ecommerce site

    Feature Description

    Scenario: Fill in the user data
    Given navigate to ecom site
    When fill in the user data 
    And validate the user data
    Then click on the submit button and validate the Success message

    Scenario: Go to the shop link and buy mobile
    Given navigate to the shop link
    Then write all the mobile data in the json file
    And user selects the phones he wants to buy
    |Mobile|
    |iphone X|
    # |Samsung Note 8|
    |Nokia Edge|
    And user clicks on the checkout button on the mobile selection page
    And user calculates the total price of selected mobile phones
    And user finds out the subtotal of the mobile phones
    And user verifies the total price with the subtotal price
    And user clicks on checkout button on the mobile price page
    And user selects the delivery location
    And user agrees to the term and condition
    And user clicks on Purchase button
    Then user verifies the message 'Success! Thank you! Your order will be delivered in next few weeks'
