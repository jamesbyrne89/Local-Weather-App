$(document).ready(function(){

// Get current location from API

if ("geolocation" in navigator){ //check geolocation available 
    //try to get user current location using getCurrentPosition() method
    navigator.geolocation.getCurrentPosition(function(position){ 
            console.log("Your location \nLat : "+position.coords.latitude+" \nLang :"+ position.coords.longitude);
            lat = position.coords.latitude;
            lon = position.coords.longitude;


  var apiKey = "b86d21440d8c9a110912a2eb0845abb4";


// Get current weather from API

$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='
			+ lat + '&lon=' + lon + '&units=metric&appid=' + apiKey, function(wd) {
console.log("Got the data ,", wd);

  var currentTemp = wd.main.temp;
  var maxTemp = wd.temp_max;
  var minTemp = wd.temp_min;
  var weatherDescription = wd.weather[0].description;
  var cityName = wd.city.name;
  var country = wd.sys.country;
  var windSpeed = wd.wind.speed;
  var humidity = wd.main.humidity;

  var sunriseTime = wd.sys.sunrise;
    var sunsetTime = wd.sys.sunset;

  console.log(cityName, country, currentTemp, weatherDescription, windSpeed, humidity);
	})


// Get five-day weather forecast from API

$.getJSON('http://api.openweathermap.org/data/2.5/forecast?lat='
			+ lat + '&lon=' + lon + '&units=metric&appid=' + apiKey, function(wd5) {
console.log("Got the data ,", wd5);
});





        });


 // Finish doing everything

}else{
    console.log("Browser doesn't support geolocation!");
}

});
// get lat and lon