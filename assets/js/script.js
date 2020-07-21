$(document).ready(function () {
    
    var APIKey = "b842e13062ebcdc52faeb1014bc3a489";
    let searchArr = [];
    renderSearchList();

    //Main Routine
    $("#searchBtn").click(function (event) {
        event.preventDefault();
        //grab search term from input search field
        let searchCity = $("#cityInput").val().trim();
        let cityLat = "";
        let cityLon = "";
        currentWeather(searchCity);
        
        fiveDayForecast(searchCity);

        updateHistory(searchCity);
    });

    //Display weather when one of the history city buttons is clicked
    $(document).on("click", ".city-btn", function () {
      JSON.parse(localStorage.getItem("cities"));
      let searchCity = $(this).text();
      currentWeather(searchCity);
      fiveDayForecast(searchCity);
    });

    //Render all of the past city searches from the search history
    function renderSearchList() {
      let searchList = JSON.parse(localStorage.getItem("cities"));
      console.log ("Cities: " + searchList);

      $("#searchHistory").empty();
      if (searchList) {
        
          for (i = 0; i < searchList.length; i++) {
              let listBtn = $("<button>").addClass("btn btn-primary city-btn").attr('id', 'cityname_' + (i + 1)).text(searchList[i]);
              let listElem = $("<li>").attr('class', 'list-group-item');
              listElem.append(listBtn);

              //add the newest search button on the top of the search history list
              $("#searchHistory").prepend(listElem);
          }
      }
  }
    //Display current weather conditions for the city
    function currentWeather (searchCity) {
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIKey;
        console.log(queryURL);

        //ajax call for local weather
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        
        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
       
        let currentDate = moment().format("  MM-DD-YYYY");
        let cityName = $(".jumbotron").addClass("city-weather").text(response.name + " Weather Details for " + currentDate);
        
        let windData = $("<p>").text("Wind Speed: " + response.wind.speed + "mph").addClass("lead");
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
            renderSearchList();
            
          }) //end ajax
          //$("#five-day").empty();
          
        });   
        
    };  //end of currentWeather

    function fiveDayForecast (searchCity) { 

      console.log ("from fiveday: " + searchCity);
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIKey;
        console.log(queryURL);

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log ("from 5day forecast");
          let cityLat = response.coord.lat;
          let cityLon = response.coord.lon;
         
          console.log ("5days response lan:" + cityLat);
          console.log ("5days response lon:" + cityLon);
        
        //start 5 day forecast ajax
        let day5QueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial" + "&appid=" + APIKey;
  
        for (let i = 1; i < 6; i++) {
          $.ajax({
              url: day5QueryURL,
              type: "GET"
          }).then(function (response5Day) {
              let cardbodyElem = $("<div>").addClass("card-body");
  
              let fiveDayCard = $("<div>").addClass(".cardbody");
              let fiveDate = $("<h5>").text(moment.unix(response5Day.daily[i].dt).format("MM/DD/YYYY"));
              fiveDayCard.addClass("headline");
  
              let fiveDayTemp = $("<p>").text("Temp: " + response5Day.daily[i].temp.max + "°");
              fiveDayTemp.attr("id", "#fiveDayTemp[i]");
  
              let fiveHumidity = $("<p>").attr("id", "humDay").text("Humidity: " + JSON.stringify(response5Day.daily[i].humidity) + "%");
              fiveHumidity.attr("id", "#fiveHumidity[i]");
  
              let iconCode = response5Day.daily[i].weather[0].icon;
              let iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
              let weatherImgDay = $("<img>").attr("src", iconURL);
              $("#testImage").attr("src", iconURL);
  
              cardbodyElem.append(fiveDate);
              cardbodyElem.append(weatherImgDay);
              cardbodyElem.append(fiveDayTemp);
              cardbodyElem.append(fiveHumidity);
              fiveDayCard.append(cardbodyElem);
              $("#five-day").append(fiveDayCard);
              $("#fiveDayTemp[i]").empty();
              $(".jumbotron").append(cardbodyElem);
          }); //end of inner ajax
         
      } //end of for loop
      // $("#search").val("");
    }); //end of outer .ajax

    } //end of 5dayforecast function

    function updateHistory(searchCity) {

      let previousCity = JSON.parse(localStorage.getItem("cities"));
      if (previousCity) {
          previousCity.push(searchCity);
          localStorage.setItem("cities", JSON.stringify(previousCity));
      } else {
          searchArr.push(searchCity);
          localStorage.setItem("cities", JSON.stringify(searchArr));
      }
    }//end of updateHistory function
}) //end of js
