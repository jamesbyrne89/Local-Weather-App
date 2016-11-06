$(document).ready(function(){

// Get current location from API
    navigator.geolocation.getCurrentPosition(function(position){ 
            console.log("Your location \nLat : "+position.coords.latitude+" \nLang :"+ position.coords.longitude);
            lat = position.coords.latitude;
            lon = position.coords.longitude;


  var apiKey = "b86d21440d8c9a110912a2eb0845abb4";


// Get current weather from API

$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='
			+ lat + '&lon=' + lon + '&units=metric&appid=' + apiKey, function(wd) {
console.log("Got today's data ,", wd);

  var currentTemp = wd.main.temp.toFixed(0);
  var maxTemp = wd.temp_max;
  var minTemp = wd.temp_min;
  var weatherDescription = wd.weather[0].description;
  var cityName = wd.name;
  var country = wd.sys.country;
  var windSpeed = (wd.wind.speed) * 2.23694.toFixed(0);
  var humidity = wd.main.humidity.toFixed(0);
  var cloudiness = wd.clouds.all;
var windDirection = wd.wind.deg;
  var sunriseTime = wd.sys.sunrise;
    var sunsetTime = wd.sys.sunset;

  console.log(cityName, country, currentTemp, weatherDescription, windSpeed, humidity, cloudiness);



// Get five-day weather forecast from API

$.getJSON('http://api.openweathermap.org/data/2.5/forecast?lat='
			+ lat + '&lon=' + lon + '&units=metric&appid=' + apiKey, function(wd5) {
console.log("Got the forecast data", wd5);
});

$('#day-one').html(currentTemp + "&deg;");

// Get date



var months = new Array(12);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

var current_date = new Date();
month_value = current_date.getMonth();
day_value = current_date.getDate();
year_value = current_date.getFullYear();

$('#dateandtime').html(day_value + " " + months[month_value] + ", " +
 year_value);

// Place into HTML

$('#current-temp').html(currentTemp + "&deg;");
$('#weather-description').html(weatherDescription);
$('#location').html(cityName + ", " + country);
$('.cloudiness').html(cloudiness + "\%");
$('#humidity').html(humidity + "\%");
$('.wind-speed').html(windSpeed + " mph");
$('.wind-direction').html(windDirection);

	

 var currentTemp = wd.main.temp.toFixed(0);
 var currentTempFar = ((currentTemp)*(9/5)-459.67).toFixed(0);

$("body").find("checkbox").each(function(){
    if ($(this).prop('checked')==true){ 
       console.log("checked!")
    }
});

})
 // Finish doing everything
});
});


