# weather_dashboard_app

This is a weather dashboard application to show user today's weather and 5 day future forecast for a city that he/she searches. Data included in the forecast is windspeed, humidity, temp in Fahrenheit, and UV index level with badge indicating safety level.

Built with: HTML, CSS, JS, Bootstrap, OpenWeather Api's for weather data, moment js for date information and Google fonts api. Weather symbol pulled in from openweather api. Link to openweather api and documentation: https://openweathermap.org/api

This appliction was built with a combination of bootstrap framework and dynamically created javascript elements. The navbar, search field, search button and jumbotron were created with Bootstrap.
The weather display and 5 day forecast cards are dynamically created using Javascript. 
The search field captures the city name entered and retrieves the weather for that city with two seperate ajax calls to the openweather api. 
The weather icon is retrieved with an ajax call to the openweather api. 
After user searched on the city, the name of the city will be stored in local storage in the array format. It will be also displayed on the top of the search history as a button with the name of the city.
Cities searched will display in button form in a list on the left side of the application. 
When each city button is clicked, the application will display weather results for that city. The results will 

Plans for future development: Add a clear search list button to clear local storage to clear city search buttons list.

Pull in a picture of the city searched and display in the jumbotron with the weather. You could use a photo api to pull in and display the page.

Picture of Weather Dashboard: