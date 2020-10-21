// api key
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1b885e610b5ff8d663b1c0a52218b536

var getCityLocation = function() {
    fetch("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1b885e610b5ff8d663b1c0a52218b536");
}   
getCityLocation();