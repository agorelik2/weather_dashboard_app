var searchHistory = {
    searches: [],
  };


$(document).ready(function () {
    // renderSearchList();
    var APIKey = "b842e13062ebcdc52faeb1014bc3a489";

    
    $("#searchBtn").click(function (event) {
        event.preventDefault();
        //grab search term from input search field
        let searchCity = $("#cityInput").val().trim();
        console.log (searchCity);

        currentWeather(searchCity);
        // fiveDayForecast(searchCity);
        // updateHistory(searchCity);
    });

    function currentWeather (searchCity) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIKey;
        console.log(queryURL);

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        
          
          console.log(response);

        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
       
        let cityName = $(".jumbotron").addClass("city-weather").text(response.name + " Weather Details  ");
        let currentDate = moment().format("  MM-DD-YYYY");
        //let headline = $("<h2>" + cityName + ' (' + currentDate + ') ' + "</h2>");
        let windData = $("<p>").text("Wind Speed: " + response.wind.speed).addClass("lead");
        let humidityData = $("<p>").text("Humidity: " + response.main.humidity + "%").addClass("lead");

        // Convert the temp to fahrenheit
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        let roundedTemp = Math.floor(tempF);

         
        //temp elements added to html
        let tempData = $("<p>").text("Temp (K): " + response.main.temp + "°").addClass("lead");
        let tempDataF = $("<p>").text("Temp (F): " + roundedTemp + "°").addClass("lead")

        var iconCode = response.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
        let weatherImg = $("<img>").attr("src", iconUrl);
        cityName.append(weatherImg, windData, humidityData, tempData, tempDataF);
        $("container").append(cityName);

        
        let cityLat = response.coord.lat;
        let cityLon = response.coord.lon;
          
        let uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?" + "&appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLon;
          
        $.ajax({
            type: "GET",
            url: uvIndexURL,
          }).then(function (responseUV) {

            console.log (responseUV);
            console.log (responseUV.value);

            let currentUV = $("<div>").addClass('lead uv-index').text("UV Index: ");
            let uvValue = $("<span class='badge id='current-uv-level'>").text(responseUV.value);
            currentUV.append(uvValue);
            
            if (responseUV.value >= 0 && responseUV.value < 3) {
                $(uvValue).addClass("badge-success");
            } else if (responseUV.value >= 3 && responseUV.value < 6) {
                $(uvValue).addClass("badge-mild");
            } else if (responseUV.value >= 6 && responseUV.value < 8) {
                $(uvValue).addClass("badge-warning");
            } else if (responseUV.value >= 8 && responseUV.value < 11) {
                $(uvValue).addClass("badge-veryhigh");
            } else if (responseUV.value >= 11) {
                $(uvValue).addClass("badge-danger");
            }
            
            cityName.append(currentUV);
            
            
          })
          //$("#five-day").empty();
          // headline.attr("class", "ml-3 mt-3");
          // cityTemp.attr("class", "ml-3 mt-3");
          // cityHumidity.attr("class", "ml-3");
          // cityWindSpeed.attr("class", "ml-3");
          // currentWeatherDiv.append(headline);
          // headline.append(weatherImg);
          // currentWeatherDiv.append(cityTemp);
          // currentWeatherDiv.append(cityHumidity);
          // currentWeatherDiv.append(cityWindSpeed);
          // $("#mainBody").append(currentWeatherDiv);

        //   $("#current").replaceWith(currentWeatherDiv);
          //add UV
        });   
    }  //end of currentWeather
}) //end of js
