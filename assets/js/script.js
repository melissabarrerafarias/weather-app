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

// day two: 
var weatherDayTwo = document.querySelector("#date-two");
var fcTempTwo = document.querySelector("#two-temp")
var fcHumidTwo = document.querySelector("#humid-two");

// day three:
var weatherDayThree = document.querySelector("#date-three");
var fcTempThree = document.querySelector("#three-temp");
var fcHumidThree = document.querySelector("#humid-three");

// day four: 
var weatherDayFour = document.querySelector("#date-four");
var fcTempFour = document.querySelector("#four-temp");
var fcHumidFour = document.querySelector("#humid-four");


// day five:
var weatherDayFive = document.querySelector("#date-five");
var fcTempFive = document.querySelector("#five-temp");
var fcHumidFive = document.querySelector("#humid-five");


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
    fcTempTwo.textContent = "Temp: " + forecast.list[2].main.temp + "°F";
    fcTempThree.textContent = "Temp: " + forecast.list[3].main.temp + "°F";
    fcTempFour.textContent = "Temp: " + forecast.list[4].main.temp + "°F";
    fcTempFive.textContent = "Temp: " + forecast.list[5].main.temp + "°F";

    // humidity for five-day 
    fcHumidOne.textContent = "Humidity: " + forecast.list[1].main.humidity + "%";
    fcHumidTwo.textContent = "Humidity: " + forecast.list[2].main.humidity + "%";
    fcHumidThree.textContent = "Humidity: " + forecast.list[3].main.humidity + "%";
    fcHumidFour.textContent = "Humidity: " + forecast.list[4].main.humidity + "%";
    fcHumidFive.textContent = "Humidity: " + forecast.list[5].main.humidity + "%";
}

searchFormEl.addEventListener("submit", submitCity);

