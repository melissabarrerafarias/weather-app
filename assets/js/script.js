// api key
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1b885e610b5ff8d663b1c0a52218b536

var getCityLocation = function (city) {
    // api url for weather
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1b885e610b5ff8d663b1c0a52218b536";

    // makes the request 
    fetch(apiUrl).then(function (response) {
        response.json().then(function(data) { // formats response as JSON
            console.log(data);
        });
    });
console.log("outside")
}
getCityLocation("San Jose");