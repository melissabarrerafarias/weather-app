// api key
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1b885e610b5ff8d663b1c0a52218b536

// uv data
// http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}

// 5-day forecast
// http://api.openweathermap.org/data/2.5/forecast?q=München,US&appid={API key}

// these two variables target the form element (searchFormEl) and the input element (searchInputEl) in the HTML
var searchFormEl = document.querySelector("#search-city");
var searchInputEl = document.querySelector("#search-input")

// these variables target the corresponding elements in the <div> that hold the chosen cities' weather
var cityWeatherContainer = document.querySelector("#city-status");
var currentCity = document.querySelector("#current-city");
var cityTemperature = document.querySelector("#temperature");
var cityHumidity = document.querySelector("#humidity");
var cityWindSpeed = document.querySelector("#wind-speed");
var cityUVIndexText = document.querySelector("#uv-index-title");
var cityUVIndex = document.querySelector("#uv-index");
var icon = document.querySelector("#weather-icon");
var imageContainer = document.createElement("img");
var dateContainer = document.createElement("h2");

// these variables correspond to the elements in the 5-day forecast containers

// day one:
var weatherDayOne = document.querySelector("#date-one");
var fcTempOne = document.querySelector("#one-temp");
var fcHumidOne = document.querySelector("#humid-one");
var iconOneContainer = document.createElement("img");

// day two: 
var weatherDayTwo = document.querySelector("#date-two");
var fcTempTwo = document.querySelector("#two-temp")
var fcHumidTwo = document.querySelector("#humid-two");
var iconTwoContainer = document.createElement("img");

// day three:
var weatherDayThree = document.querySelector("#date-three");
var fcTempThree = document.querySelector("#three-temp");
var fcHumidThree = document.querySelector("#humid-three");
var iconThreeContainer = document.createElement("img");

// day four: 
var weatherDayFour = document.querySelector("#date-four");
var fcTempFour = document.querySelector("#four-temp");
var fcHumidFour = document.querySelector("#humid-four");
var iconFourContainer = document.createElement("img");


// day five:
var weatherDayFive = document.querySelector("#date-five");
var fcTempFive = document.querySelector("#five-temp");
var fcHumidFive = document.querySelector("#humid-five");
var iconFiveContainer = document.createElement("img");


var getCityWeather = function (city) {
    // api url for weather
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=1b885e610b5ff8d663b1c0a52218b536";

    // makes the request 
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) { // formats response as JSON
            displayWeather(data, city);
        });
    });
}

var submitCity = function (event) {
    event.preventDefault();
    // get the city from search bar 
    var locationChosen = searchInputEl.value.trim();

    // verify they chose a city and clear input
    if (locationChosen) {
        getCityWeather(locationChosen);
        searchInputEl.value = "";
    }
    else {
        alert("Please enter the city you would like to see!");
    }
    futureForecast(locationChosen);
}

// these parameters represent accordingly: weather/data and location/city in the getCityWeather function
var displayWeather = function (weather, location) {
    // get icon code from response
    var iconCode = weather.weather[0].icon;
    iconImage = "http://openweathermap.org/img/wn/" + iconCode + ".png";

    // display which city 
    currentCity.textContent = location;
    cityTemperature.textContent = "Temperature: " + weather.main.temp + "°F";
    cityHumidity.textContent = "Humidity: " + weather.main.humidity + "%";
    cityWindSpeed.textContent = "Wind Speed: " + weather.wind.speed + "MPH";
    cityUVIndexText.textContent = "UV-Index: ";

    // use imageContainer, (the img element created with script), and append the icon
    imageContainer.setAttribute("src", iconImage);
    currentCity.appendChild(imageContainer);

    currentCity.appendChild(dateContainer);
    // get latitude and longitude of current city 
    var latitude = weather.coord.lat;
    var longitude = weather.coord.lon;

    getUvIndex(latitude, longitude)
}

// take in two parameters: x = latitude and y = longitude
var getUvIndex = function (x, y) {
    var uvApiUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + x + "&lon=" + y + "&appid=1b885e610b5ff8d663b1c0a52218b536";

    fetch(uvApiUrl).then(function (response) {
        response.json().then(function (index) {
            cityUVIndex.textContent = index.value;
            changeUvColor(index);
            formatDate(index);
        });
    });
}

// gives the current date 
var formatDate = function (index) {
    var queryDate = index.date_iso;
    var currentDate = queryDate.split("T")[0];
    dateContainer.textContent = "(" + currentDate + ")";
}

// changes color according to uv index
var changeUvColor = function (index) {

    var uvStatus = index.value;
    if (uvStatus < 3) {
        cityUVIndex.classList = "uv-healthy";
    }
    if (uvStatus > 3) {
        cityUVIndex.classList = "uv-moderate";
    }
    if (uvStatus > 5) {
        cityUVIndex.classList = "uv-mod-unhealthy";
    }
    if (uvStatus > 7) {
        cityUVIndex.classList = "uv-unhealthy";
    }
    if (uvStatus > 11) {
        cityUVIndex.classList = "uv-very-unhealthy";
    }
}

var futureForecast = function (city) {
    var forecastApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=1b885e610b5ff8d663b1c0a52218b536";
    console.log(forecastApi);
    fetch(forecastApi).then(function (response) {
        response.json().then(function (results) { // formats response as JSON
            displayFutureForecast(city, results);
        });
    });
}

// parameters are: location = city and forecast = results
var displayFutureForecast = function(location, forecast) {
    console.log(location, forecast);
    console.log(forecast.list[1].main.humidity);
    // temperature for five-day
    fcTempOne.textContent = "Temp: " + forecast.list[1].main.temp + "°F";
    fcTempTwo.textContent = "Temp: " + forecast.list[9].main.temp + "°F";
    fcTempThree.textContent = "Temp: " + forecast.list[17].main.temp + "°F";
    fcTempFour.textContent = "Temp: " + forecast.list[25].main.temp + "°F";
    fcTempFive.textContent = "Temp: " + forecast.list[33].main.temp + "°F";

    // humidity for five-day 
    fcHumidOne.textContent = "Humidity: " + forecast.list[1].main.humidity + "%";
    fcHumidTwo.textContent = "Humidity: " + forecast.list[9].main.humidity + "%";
    fcHumidThree.textContent = "Humidity: " + forecast.list[17].main.humidity + "%";
    fcHumidFour.textContent = "Humidity: " + forecast.list[25].main.humidity + "%";
    fcHumidFive.textContent = "Humidity: " + forecast.list[33].main.humidity + "%";

    // dates 
    var dayOne = forecast.list[1].dt_txt;
    var dayOneText = dayOne.split("03:")[0].trim();
    weatherDayOne.textContent = dayOneText;

    var dayTwo = forecast.list[9].dt_txt;
    var dayTwoText = dayTwo.split("03:")[0].trim();
    weatherDayTwo.textContent = dayTwoText;

    var dayThree = forecast.list[17].dt_txt;
    var dayThreeText = dayThree.split("03:")[0].trim();
    weatherDayThree.textContent = dayThreeText;

    var dayFour = forecast.list[25].dt_txt;
    var dayFourText = dayFour.split("03:")[0].trim();
    weatherDayFour.textContent = dayFourText;

    var dayFive = forecast.list[33].dt_txt;
    var dayFiveText = dayFive.split("03:")[0].trim();
    weatherDayFive.textContent = dayFiveText;


    // add icon code
    // day one forecast
    fcIconOne = forecast.list[1].weather[0].icon;
    fcIconImage = "http://openweathermap.org/img/wn/" + fcIconOne + ".png";
    iconOneContainer.setAttribute("src", fcIconImage);
    weatherDayOne.appendChild(iconOneContainer);

    // day two forecast 
    fcIconTwo = forecast.list[9].weather[0].icon;
    fcIconImage = "http://openweathermap.org/img/wn/" + fcIconTwo + ".png";
    iconTwoContainer.setAttribute("src", fcIconImage);
    weatherDayTwo.appendChild(iconTwoContainer);

    // day three forecast
    fcIconThree = forecast.list[17].weather[0].icon;
    fcIconImage = "http://openweathermap.org/img/wn/" + fcIconThree + ".png";
    iconThreeContainer.setAttribute("src", fcIconImage);
    weatherDayThree.appendChild(iconThreeContainer);

    // day four forecast 
    fcIconFour = forecast.list[25].weather[0].icon;
    fcIconImage = "http://openweathermap.org/img/wn/" + fcIconFour + ".png";
    iconFourContainer.setAttribute("src", fcIconImage);
    weatherDayFour.appendChild(iconFourContainer);

    // day five forecast 
    fcIconFive = forecast.list[33].weather[0].icon;
    fcIconImage = "http://openweathermap.org/img/wn/" + fcIconFive + ".png";
    iconFiveContainer.setAttribute("src", fcIconImage);
    weatherDayFive.appendChild(iconFiveContainer);
}

searchFormEl.addEventListener("submit", submitCity);

