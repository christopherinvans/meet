MEET-APP

Objective: To build a serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

Meet-App Scenarios

Feature 1: Filter Events by City

	User story: As a user, I want to be able to filter events by city so that I can see upcoming events in that city.

	Scenario 1: When user hasn’t selected a city, show upcoming events from all cities.
		Given the app is loaded,
		When user hasn’t selected a city,
		Then the user should see a list of all upcoming events.

	Scenario 2: User should see list of suggestions when searching for a city.
		Given the main page is open with the list of events in all cities,
		When user starts typing city name in text box,
		Then the user should see a list of suggested cities based on their input.
	
	Scenario 3: When the user searches for a city, a list of events for this city should be shown.
		Given the user was typing “Spokane” in the text box, and a list of suggested cities is showing,
		When the user selects a city (Spokane, WA, USA) for the list of suggested cities,
		Then the user city should be changed to the selected city and the user should receive a list of upcoming events in that city.

Feature 2: Show/Hide Event Details

	User Story: As a user, I want to be able to show and hide event details so that I can see more or less information about an event.

	Scenario 1: An event element is collapsed by default.
		Given the app is loaded,
		When the user has received a list of upcoming events in specified city (or all cities),
		Then event details are not yet visible for user.

	Scenario 2: User can expand an event to see its details.
		Given user received general info about upcoming events,
		When user pushes button “Details” for specific event,
		Then specific event is expanded with details.

	Scenario 3: User can collapse an event to hide its details.
		Given specific event is expanded with details,
		When user pushes the button “Back” for specific event,
		Then specific event is collapsed, details are hidden, and user receives list of upcoming events with general info only.

Feature 3: Specify Number of Events

	User story: As a user, I want to be able to specify the number of events displayed in the app so that I can view more or fewer events at one time.

	Scenario 1: When user has not specified a number, 32 is the default number.
		Given the app is loaded, user has received a list of upcoming events in specified city (or all cities),
		When user has not specified a number of events to be shown,
		Then user receives first 32 upcoming events on screen.

	Scenario 2: User can change number of events they want to see.
		Given app is loaded, user has received a list of upcoming events in specified city ( or all cities),
		When user hasn’t specified a number of events to be shown by choosing the number in input (can be 32, 64, 			or 96),
		Then user receives chosen number of upcoming events (32, 64, or 96).

Feature 4: Use App When Offline

	User story: As a user, I want to be able to use the app when offline so that I can see the events I viewed last time I was online.

	Scenario 1: Show cached data when there’s no internet connection.
		Given user has previously opened app with an available internet connection,
		When user opens app without internet connection,
		Then user receives cached data from their last session.

	Scenario 2: Show error when user changes settings (city, time range)
		Given user has opened app without internet connection and received cached data from their last session,
		When user changes settings (city, time range),
		Then user receives error message stating that data is not available without internet connection.

Feature 5: Data Visualization

	User story: As a user, I want to be able to see a chart showing upcoming events in each city, so that I know what events are organized in which city.

	Scenario 1: Show a chart with the number of upcoming events in each city.
		Given the app is loaded, user has received a list of upcoming events in specified city (or all cities),
		When user pushes button “Visualize”,
		Then they will see a chart showing the number of upcoming events in that city, categorized by type.
