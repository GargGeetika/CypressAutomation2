Feature: Learn various Rest calls using 'https://gorest.co.in/rest-console'

    Feature Description

    Scenario: Use Get call to fetch data and validate it
    Given user uses a Get api call to fetch data
    Then validates the response code '200'
    And fetch the ids where name is
    |Name|
    |Priya Varrier|
    |Mohan Marar|

    Scenario: Use Post call to insert user record and validate it
    Given user wants to enter new data using the post call
    Then validates the response code '201'
    And validate the body of the response

    Scenario: Use Put Call to update the record inserted by the above post call and validate it
    Given user wants to update the data of the user record 
    #Then  user updates the '' file with new data
    Then validates the response code '200'
    And validate the body of the response

    Scenario: Use Get call to fetch data on the basis on Id and validate it
    Given user uses a Get api call to fetch data using id
    Then validates the response code '200'

    Scenario: Delete the record created using Post call
    Given Delete the user created using id
    Then validates the response code '204'

    Scenario: Create an Intercept response from the fixture file
    Given Mocking data with intercept call

