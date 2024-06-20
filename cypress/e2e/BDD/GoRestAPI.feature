Feature: Learn various Rest calls using 'https://gorest.co.in/rest-console'

    Feature Description

    Scenario: Use Get call to fetch data and validate it
    Given user uses a Get api call to fetch data
    Then validates the response code '200'
    And fetch the ids where name is
    |Name|
    |Priya Varrier|
    |Mohan Marar|

    #Scenario: Use Post call to insert user record and validate it
    #Given user wants to enter data using the post call
    #Then validates the response code '200'
    #And fetches the new record

