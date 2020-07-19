var searchHistory = {
    searches: [],
  };

$(document).ready(function () {
    renderSearchList();

    $("#searchBtn").click(function (event) {
        event.preventDefault();
        //grab search term from input search field
        let searchCity = $("#cityInput").val().trim();
        currentWeather(searchCity);
        fiveDayForecast(searchCity);
        updateHistory(searchCity);
    });

    function currentWeather (search) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        search + "&APPID=557a17e47d2048a4f13a9ac57fd5c718";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        
          let cityName = response.name;
          let currentDate = moment().format("  MM-DD-YYYY");
          let headline = $("<h2>" + cityName + ' (' + currentDate + ') ' + "</h2>");

          var iconCode = response.weather[0].icon;
          var iconURL = "https://openweathermap.org/img/wn/" + iconCode + ".png";
          let tempF = (response.main.temp - 273.15) * 1.80 + 32;
          let roundedTemp = Math.floor(tempF);

          var cityTemp = $("<p>").text("Temperature: " + roundedTemp + "°F").addClass("lead");;
          var cityHumidity = $("<p>").text("Humidity: " + response.main.humidity + "%").addClass("lead");     
          var cityWindSpeed = $("<p>").text("Wind Speed: " + response.wind.speed).addClass("lead");
         
          var cityLat = response.coord.lat;
          var cityLon = response.coord.lon;

          headline.attr("class", "ml-3 mt-3");
          cityTemp.attr("class", "ml-3 mt-3");
          cityHumidity.attr("class", "ml-3");
          cityWindSpeed.attr("class", "ml-3");
          currentWeatherDiv.append(headline);
          headline.append(weatherIcon);
          currentWeatherDiv.append(cityTemp);
          currentWeatherDiv.append(cityHumidity);
          currentWeatherDiv.append(cityWindSpeed);
          $("#current").replaceWith(currentWeatherDiv);
          //add UV
        });   
    }  //end of currentWeather
}) //end of js
