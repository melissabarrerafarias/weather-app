// api key
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1b885e610b5ff8d663b1c0a52218b536

// these two variables target the form element (searchFormEl) and the input element (searchInputEl) in the HTML
var searchFormEl = document.querySelector("#search-city");
var searchInputEl = document.querySelector("#search-input")

// these variables target the corresponding elements in the <div> that hold the chosen cities' weather
var cityWeatherContainer = document.querySelector("#city-status");
var currentCity = document.querySelector("#current-city");
var cityTemperature = document.querySelector("#temperature");
var cityHumidity = document.querySelector("#humidity");
var cityWindSpeed = document.querySelector("#wind-speed");
var cityUVIndex = document.querySelector("#uv-index");
var icon = document.querySelector("#weather-icon");
var imageContainer = document.createElement("img");

var getCityWeather = function (city) {
    // api url for weather
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=1b885e610b5ff8d663b1c0a52218b536";

    // makes the request 
    fetch(apiUrl).then(function (response) {
        response.json().then(function(data) { // formats response as JSON
            displayWeather(data, city);
        });
    });
}

var submitCity = function(event) {
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
}

// these parameters represent accordingly: weather/data and location/city in the getCityWeather function
var displayWeather = function(weather, location) {
    console.log(weather);
    console.log(location);
    // get icon code from response
    var iconCode = weather.weather[0].icon;
    iconImage = "http://openweathermap.org/img/wn/" + iconCode + ".png";

    // display which city 
    currentCity.textContent = location;
    cityTemperature.textContent = "Temperature: " + weather.main.temp + "°";
    cityHumidity.textContent = "Humidity: " + weather.main.humidity + "%";
    cityWindSpeed.textContent = "Wind Speed: " + weather.wind.speed + "MPH";
    imageContainer.setAttribute("src", iconImage);
    currentCity.appendChild(imageContainer);
};
searchFormEl.addEventListener("submit", submitCity);

