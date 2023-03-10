Feature: Show/hide an event's details

  Scenario: An event element is collapsed by default
    Given the user opens the app
    When the user scrolls through a list of events
    Then the user will not see the details of each event

  Scenario: User can expand an event to see its details
    Given the main page is open
    When the user selects the details button in the app
    Then the user will see the event details

  Scenario: User can collapse an event to hide its details
    Given the user has read an event's details
    When the user selects the details button in the app
    Then the event's details will be hidden from the user