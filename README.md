                                      MEET APP 

The Meet App is a serverless, Progressive Web Application (PWA) with React using a test-driven development (TDD) technique. The App is designed for event organizers and 
attendees who want to manage and participate in different events seamlessly. It is a comprehensive application that allows users to browse, search, and register for events
at any time. As well as view event details, locations, and schedules. 



                          Converting Features to User Stories : 

1. As a User, I should be able to filter the events by the location I prefer, so that I can view events near me.

2. As a User, I should be able to expand / collapse the details of an event so that the details won’t be overwheliming at first glance. 

3. As a User, I should be able to control the number of events that I’d like to view, so I can avoid having to decide from so many. 

4. As a User, I should be able to see my past searched events when I had Internet connection, so that I can have access to them at all times.

5. As a User, I should be able to install a shortcut to the Meet app, so that I can have quick access to the app. 

6. As a User, I should be able to view charts of the upcoming events in each city, so that I can plan my future outings accordingly. 


                   Converting scenarios using Gherkin Syntax: 

Feature 1: Filter Events By City 

Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities. 

Given the user has not specified city;
When user opens Meet app;
Then the user should see a list of upcoming events from all cities.
	
Scenario 2: Users should see a list of suggestions when they search for a city. 

Given the main page is open;
When the user begins typing the city desired;
Then the user should begin to see a drop down list of suggested cities matching the one being typed. 

Scenario 3: User can select a city from the suggested list.

Given user was typing “New York” in the search box and suggested list is showing; 
When the user selects a city from the list;
Then the app loads all upcoming events for the selected city.


Features 2: Show/Hide Events Details 

Scenario 1: An event element is collapsed by default.

Given an event is is available;
When the page loads;
Then the event details should be collapsed by default.

Scenario 2: Users can expand an event to see details. 

Given the user is looking at an event;
When the user clicks “see more”;
Then the event's full details should be displayed.

Scenario 3: User can collapse an event to hide details. 

Given the user has finished reading the events details;
When the user clicks “see less”;
Then the event should collapse the information.

Feature 3: Specify Number of Events 

Scenario 1: When user hasn’t specified a number, 32 events are shown by default.

Given the user is on the app;
When the user does not specify a number of events to be shown;
Then 32 events should be displayed by default.

Scenario 2: User can change the number of events displayed.

Given the user is on the filter section;
When the user inputs how many events they’d like to see;
Then the app will display the amount of events specified. 

Feature 4: Use the App when offline. 

Scenario 1: Show cached data when there's no internet connection.

Given the user has previously accessed the app with internet connection and the app has cached data;
When there is no internet connection;
Then show the cached data to the user.

Scenario 2: Show error when user changes search settings (city, number of events).

Given the user is offline;
When the user changes search settings ;
Then an error message should be displayed indicating the changes cannot be made offline.

Feature 5 : Add an App Shortcut to the Home Screen 

Scenario 1: User can install the meet app as a shortcut on their device home screen.

Given the user is on the Meet webpage;
When the user selections the option to install the Meet App;
Then the app should be installed on the user’s device home screen.

Feature 6: Display Charts Visualizing Event Details 

Scenario 1: Show a Chart with the number of upcoming events in each city.

Given there are multiple events in multiple cities;
When the user views and events details;
Then a chart displaying the number of upcoming events in each city should be shown.
