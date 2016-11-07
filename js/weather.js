$(document).ready(function(){

// Get current location from API
  var lat;
  var lon;
  var city;
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  } else {
    alert("Geolocation services are not supported by your web browser.");
  }


  function success(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    var reversegeocodingapi = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+"%2C"+lon;
    $.getJSON(reversegeocodingapi, function(place) {
      for (var i=0; i<place.results[0].address_components.length; i++) {
        if (place.results[0].address_components[i].types[0]==="locality") {
          var city = place.results[0].address_components[i].long_name;

        }
        if (place.results[0].address_components[i].types[0]==="administrative_area_level_1") {
          var state = place.results[0].address_components[i].long_name;
          $("#state").html(state);
        }

      }
    //end success
    function error() {
    alert("Geolocation requires a secure connection to work. Please add 'https://' to the beginning of this page's URL. (i.e. 'https://codepen.io/bethqiang/full/bZrZpa')");
  }

    console.log(lat, lon);
    


  var apiKey = "f0357c3104cec9981bd0216276f0778f";


// Get current weather from API

$.getJSON('https://api.forecast.io/forecast/' + apiKey + '/'+ lat + ',' + lon + '?units=si&callback=?'
, function(wd) {
console.log("Got forecast data: ", wd);

	var currentTemp = wd.currently.temperature.toFixed(0);
	var maxTemp = wd.daily.data[0].temperatureMax.toFixed(0);
	var minTemp = wd.daily.data[0].temperatureMin.toFixed(0);
	var weatherDescription = wd.currently.icon.replace(/-|\s/g," ");
	var precipChance = ((wd.daily.data[0].precipProbability) * 100).toFixed(0);
	var windSpeed = ((wd.currently.windSpeed) * 2.23694).toFixed(0);
	var humidity = ((wd.currently.humidity) * 100).toFixed(0);
	var cloudiness = wd.currently.cloudCover;
	var windDirection = wd.currently.windBearing;


// Place current weather values into HTML

$('#current-temp').html(currentTemp + "&deg;");
$('.high-temp-left').html(maxTemp + "&deg;");
$('.low-temp-left').html(minTemp + "&deg;");
$('#weather-description').html(weatherDescription);
$('#location').html(city);
$('.wind-speed').html(windSpeed + " mph");
$('.wind-direction').html(windDirection);
$('.precip-chance').html(precipChance + "\%");
$('.cloudiness').html(cloudiness + "\%");
$('.humidity').html(humidity + "\%");




// Get five-day weather forecast from API


	var dayOneMax = wd.daily.data[1].temperatureMax.toFixed(0);
	console.log(dayOneMax);
	var dayOneMin = wd.daily.data[1].temperatureMin.toFixed(0);

	var dayTwoMax = wd.daily.data[2].temperatureMax.toFixed(0);
	var dayTwoMin = wd.daily.data[2].temperatureMin.toFixed(0);

	var dayThreeMax = wd.daily.data[3].temperatureMax.toFixed(0);
	var dayThreeMin = wd.daily.data[3].temperatureMin.toFixed(0);

	var dayFourMax = wd.daily.data[4].temperatureMax.toFixed(0);
	var dayFourMin = wd.daily.data[4].temperatureMin.toFixed(0);

	var dayFiveMax = wd.daily.data[5].temperatureMax.toFixed(0);
	var dayFiveMin = wd.daily.data[5].temperatureMin.toFixed(0);

	var dayOneWeather = wd.daily.data[1].icon.replace(/-|\s/g," ");
	var dayTwoWeather = wd.daily.data[2].icon.replace(/-|\s/g," ");
	var dayThreeWeather = wd.daily.data[3].icon.replace(/-|\s/g," ");
	var dayFourWeather = wd.daily.data[4].icon.replace(/-|\s/g," ");
	var dayFiveWeather = wd.daily.data[5].icon.replace(/-|\s/g," ");

	var dayOneIcon = wd.daily.data[1].icon;
	var dayTwoIcon = wd.daily.data[2].icon;
	var dayThreeIcon = wd.daily.data[3].icon;
	var dayFourIcon = wd.daily.data[4].icon;
	var dayFiveIcon = wd.daily.data[5].icon;


// Place forecast values into HTML

$('#day-one-forecast-temp-hi').html(dayOneMax);
$('#day-one-forecast-temp-lo').html(dayOneMin + "&deg;");
$('#day-two-forecast-temp-hi').html(dayTwoMax + "&deg;");
$('#day-two-forecast-temp-lo').html(dayTwoMin + "&deg;");
$('#day-three-forecast-temp-hi').html(dayThreeMax + "&deg;");
$('#day-three-forecast-temp-lo').html(dayThreeMin + "&deg;");
$('#day-four-forecast-temp-hi').html(dayFourMax + "&deg;");
$('#day-four-forecast-temp-lo').html(dayFourMin + "&deg;");
$('#day-five-forecast-temp-hi').html(dayFiveMax + "&deg;");
$('#day-five-forecast-temp-lo').html(dayFiveMin + "&deg;");


// Get icons

	var currentIcon = wd.currently.icon;

// Change icon depending on weather

    if (currentIcon == "clear-day") {
		$('#weather-icon-wrapper-left').html("<i class='wi wi-day-sunny current-weather-icon'></i>");
    }
   else if (currentIcon === "clear-night") {
		$('#weather-icon-wrapper-left').html("<i class='wi wi-night-clear current-weather-icon'></i>");
    }
    else if (currentIcon === "rain") {
		$('#weather-icon-wrapper-left').html("<i class='wi wi-day-rain current-weather-icon'></i>");
    }
    else if (currentIcon === "snow") {
		$('#weather-icon-wrapper-left').html("<i class='wi wi-day-snow current-weather-icon'></i>");
    }
    else if (currentIcon === "sleet") {
		$('#weather-icon-wrapper-left').html("<i class='wi wi-day-sleet current-weather-icon'></i>");
    }
    else if (currentIcon === "wind") {
		$('#weather-icon-wrapper-left').html("<i class='wi wi-day-windy current-weather-icon'></i>");
    }
    else if (currentIcon === "fog") {
		$('#weather-icon-wrapper-left').html("<i class='wi wi-day-fog current-weather-icon'></i>");
    }
    else if (currentIcon === "cloudy") {
		$('#weather-icon-wrapper-left').html("<i class='wi wi-day-cloudy current-weather-icon'></i>");
    }
    else if (currentIcon === "partly-cloudy-day") {
		$('#weather-icon-wrapper-left').html("<i class='wi wi-day-cloudy current-weather-icon'></i>");
    }
    else if (currentIcon === "partly-cloudy-night") {
		$('#weather-icon-wrapper-left').html("<i class='wi wi-night-partly-cloudy current-weather-icon'></i>");
    }
    else {
		$('#weather-icon-wrapper-left').html("<i class='wi wi-day-sunny current-weather-icon'></i>");
    }


    if (dayOneIcon == "clear-day") {
		$('#icon-day-one').html("<i class='wi wi-day-sunny forecast-list-icons'></i>");
    }
   else if (dayOneIcon === "clear-night") {
		$('#icon-day-one').html("<i class='wi wi-night-clear forecast-list-icons'></i>");
    }
    else if (dayOneIcon === "rain") {
		$('#icon-day-one').html("<i class='wi wi-day-rain forecast-list-icons'></i>");
    }
    else if (dayOneIcon === "snow") {
		$('#icon-day-one').html("<i class='wi wi-day-snow forecast-list-icons'></i>");
    }
    else if (dayOneIcon === "sleet") {
		$('#icon-day-one').html("<i class='wi wi-day-sleet forecast-list-icons'></i>");
    }
    else if (dayOneIcon === "wind") {
		$('#icon-day-one').html("<i class='wi wi-day-windy forecast-list-icons'></i>");
    }
    else if (dayOneIcon === "fog") {
		$('#icon-day-one').html("<i class='wi wi-day-fog forecast-list-icons'></i>");
    }
    else if (dayOneIcon === "cloudy") {
		$('#icon-day-one').html("<i class='wi wi-day-cloudy forecast-list-icons'></i>");
    }
    else if (dayOneIcon === "partly-cloudy-day") {
		$('#icon-day-one').html("<i class='wi wi-day-cloudy forecast-list-icons'></i>");
    }
    else if (dayOneIcon === "partly-cloudy-night") {
		$('#icon-day-one').html("<i class='wi wi-night-partly-cloudy forecast-list-icons'></i>");
    }
    else {
		$('#icon-day-one').html("<i class='wi wi-day-sunny current-weather-icon'></i>");
    }


    if (dayTwoIcon == "clear-day") {
		$('#icon-day-two').html("<i class='wi wi-day-sunny forecast-list-icons'></i>");
    }
   else if (dayTwoIcon === "clear-night") {
		$('#icon-day-two').html("<i class='wi wi-night-clear forecast-list-icons'></i>");
    }
    else if (dayTwoIcon === "rain") {
		$('#icon-day-two').html("<i class='wi wi-day-rain forecast-list-icons'></i>");
    }
    else if (dayTwoIcon === "snow") {
		$('#icon-day-two').html("<i class='wi wi-day-snow forecast-list-icons'></i>");
    }
    else if (dayTwoIcon === "sleet") {
		$('#icon-day-two').html("<i class='wi wi-day-sleet forecast-list-icons'></i>");
    }
    else if (dayTwoIcon === "wind") {
		$('#icon-day-two').html("<i class='wi wi-day-windy forecast-list-icons'></i>");
    }
    else if (dayTwoIcon === "fog") {
		$('#icon-day-two').html("<i class='wi wi-day-fog forecast-list-icons'></i>");
    }
    else if (dayTwoIcon === "cloudy") {
		$('#icon-day-two').html("<i class='wi wi-day-cloudy forecast-list-icons'></i>");
    }
    else if (dayTwoIcon === "partly-cloudy-day") {
		$('#icon-day-two').html("<i class='wi wi-day-cloudy forecast-list-icons'></i>");
    }
    else if (dayTwoIcon === "partly-cloudy-night") {
		$('#icon-day-two').html("<i class='wi wi-night-partly-cloudy forecast-list-icons'></i>");
    }
    else {
		$('#icon-day-two').html("<i class='wi wi-day-sunny current-weather-icon'></i>");
    }


    if (dayThreeIcon == "clear-day") {
		$('#icon-day-three').html("<i class='wi wi-day-sunny forecast-list-icons'></i>");
    }
   else if (dayThreeIcon === "clear-night") {
		$('#icon-day-three').html("<i class='wi wi-night-clear forecast-list-icons'></i>");
    }
    else if (dayThreeIcon === "rain") {
		$('#icon-day-three').html("<i class='wi wi-day-rain forecast-list-icons'></i>");
    }
    else if (dayThreeIcon === "snow") {
		$('#icon-day-three').html("<i class='wi wi-day-snow forecast-list-icons'></i>");
    }
    else if (dayThreeIcon === "sleet") {
		$('#icon-day-three').html("<i class='wi wi-day-sleet forecast-list-icons'></i>");
    }
    else if (dayThreeIcon === "wind") {
		$('#icon-day-three').html("<i class='wi wi-day-windy forecast-list-icons'></i>");
    }
    else if (dayThreeIcon === "fog") {
		$('#icon-day-three').html("<i class='wi wi-day-fog forecast-list-icons'></i>");
    }
    else if (dayThreeIcon === "cloudy") {
		$('#icon-day-three').html("<i class='wi wi-day-cloudy forecast-list-icons'></i>");
    }
    else if (dayThreeIcon === "partly-cloudy-day") {
		$('#icon-day-three').html("<i class='wi wi-day-cloudy forecast-list-icons'></i>");
    }
    else if (dayThreeIcon === "partly-cloudy-night") {
		$('#icon-day-three').html("<i class='wi wi-night-partly-cloudy forecast-list-icons'></i>");
    }
    else {
		$('#icon-day-three').html("<i class='wi wi-day-sunny current-weather-icon'></i>");
    }
 
 
    if (dayFourIcon == "clear-day") {
		$('#icon-day-four').html("<i class='wi wi-day-sunny forecast-list-icons'></i>");
    }
   else if (dayFourIcon === "clear-night") {
		$('#icon-day-four').html("<i class='wi wi-night-clear forecast-list-icons'></i>");
    }
    else if (dayFourIcon === "rain") {
		$('#icon-day-four').html("<i class='wi wi-day-rain forecast-list-icons'></i>");
    }
    else if (dayFourIcon === "snow") {
		$('#icon-day-four').html("<i class='wi wi-day-snow forecast-list-icons'></i>");
    }
    else if (dayFourIcon === "sleet") {
		$('#icon-day-four').html("<i class='wi wi-day-sleet forecast-list-icons'></i>");
    }
    else if (dayFourIcon === "wind") {
		$('#icon-day-four').html("<i class='wi wi-day-windy forecast-list-icons'></i>");
    }
    else if (dayFourIcon === "fog") {
		$('#icon-day-four').html("<i class='wi wi-day-fog forecast-list-icons'></i>");
    }
    else if (dayFourIcon === "cloudy") {
		$('#icon-day-four').html("<i class='wi wi-day-cloudy forecast-list-icons'></i>");
    }
    else if (dayFourIcon === "partly-cloudy-day") {
		$('#icon-day-four').html("<i class='wi wi-day-cloudy forecast-list-icons'></i>");
    }
    else if (dayFourIcon === "partly-cloudy-night") {
		$('#icon-day-four').html("<i class='wi wi-night-partly-cloudy forecast-list-icons'></i>");
    }
    else {
		$('#icon-day-four').html("<i class='wi wi-day-sunny current-weather-icon'></i>");
    }
 

    if (dayFiveIcon == "clear-day") {
		$('#icon-day-five').html("<i class='wi wi-day-sunny forecast-list-icons'></i>");
    }
   else if (dayFiveIcon === "clear-night") {
		$('#icon-day-five').html("<i class='wi wi-night-clear forecast-list-icons'></i>");
    }
    else if (dayFiveIcon === "rain") {
		$('#icon-day-five').html("<i class='wi wi-day-rain forecast-list-icons'></i>");
    }
    else if (dayFiveIcon === "snow") {
		$('#icon-day-five').html("<i class='wi wi-day-snow forecast-list-icons'></i>");
    }
    else if (dayFiveIcon === "sleet") {
		$('#icon-day-five').html("<i class='wi wi-day-sleet forecast-list-icons'></i>");
    }
    else if (dayFiveIcon === "wind") {
		$('#icon-day-five').html("<i class='wi wi-day-windy forecast-list-icons'></i>");
    }
    else if (dayFiveIcon === "fog") {
		$('#icon-day-five').html("<i class='wi wi-day-fog forecast-list-icons'></i>");
    }
    else if (dayFiveIcon === "cloudy") {
		$('#icon-day-five').html("<i class='wi wi-day-cloudy forecast-list-icons'></i>");
    }
    else if (dayFiveIcon === "partly-cloudy-day") {
		$('#icon-day-five').html("<i class='wi wi-day-cloudy forecast-list-icons'></i>");
    }
    else if (dayFiveIcon === "partly-cloudy-night") {
		$('#icon-day-five').html("<i class='wi wi-night-partly-cloudy forecast-list-icons'></i>");
    }
    else {
		$('#icon-day-five').html("<i class='wi wi-day-sunny current-weather-icon'></i>");
    }
 
// Get date

var days = new Array(7);
days[0] = "Sunday";
days[1] = "Monday";
days[2] = "Tuesday";
days[3] = "Wednesday";
days[4] = "Thursday";
days[5] = "Friday";
days[6] = "Saturday";

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
date_value = current_date.getDate();
day_value = current_date.getDay();
year_value = current_date.getFullYear();
d1 = ((day_value + 1) % 7);
d2 = ((day_value + 2) % 7);
d3 = ((day_value + 3) % 7);
d4 = ((day_value + 4) % 7);
d5 = ((day_value + 5) % 7);

todayPlusOne = days[d1].substring(0,3);
todayPlusTwo = days[d2].substring(0,3);
todayPlusThree = days[d3].substring(0,3);
todayPlusFour = days[d4].substring(0,3);
todayPlusFive = days[d5].substring(0,3);

// Place date information into HTML

$('#dateandtime').html(days[day_value] + " " + date_value + " " + months[month_value] + ", " +
 year_value);

$('.day-one').html(todayPlusOne);
$('.day-two').html(todayPlusTwo);
$('.day-three').html(todayPlusThree);
$('.day-four').html(todayPlusFour);
$('.day-five').html(todayPlusFive);


// Calculate fahrenheit

 var currentTempFar = ((currentTemp) * (9/5) + 32).toFixed(0);
 var maxTempFar = ((maxTemp) * (9/5) + 32).toFixed(0);
 var minTempFar = ((minTemp) * (9/5) + 32).toFixed(0);

  var dayOneMaxFar = ((dayOneMax) * (9/5) + 32).toFixed(0);
 var dayOneMinFar = ((dayOneMin) * (9/5) + 32).toFixed(0);
  var dayTwoMaxFar = ((dayTwoMax) * (9/5) + 32).toFixed(0);
 var dayTwoMinFar = ((dayTwoMin) * (9/5) + 32).toFixed(0);
  var dayThreeMaxFar = ((dayThreeMax) * (9/5) + 32).toFixed(0);
 var dayThreeMinFar = ((dayThreeMin) * (9/5) + 32).toFixed(0);
  var dayFourMaxFar = ((dayFourMax) * (9/5) + 32).toFixed(0);
 var dayFourMinFar = ((dayFourMin) * (9/5) + 32).toFixed(0);
  var dayFiveMaxFar = ((dayFiveMax) * (9/5) + 32).toFixed(0);
 var dayFiveMinFar = ((dayFiveMin) * (9/5) + 32).toFixed(0);

 // Switch between celsius and fahrenheit

$("input[type=checkbox]").change(function(){
    if (this.checked){ 
       	$('#current-temp').addClass('.current-temp-far').removeClass('.current-temp').html(currentTempFar + "&deg;");
       	$('.high-temp-left').html(maxTempFar + "&deg;");
       	$('.low-temp-left').html(minTempFar + "&deg;");

       	$('#day-one-forecast-temp-hi').html(dayOneMaxFar + "&deg;");
       	$('#day-one-forecast-temp-lo').html(dayOneMinFar + "&deg;");
       	$('#day-two-forecast-temp-hi').html(dayTwoMaxFar + "&deg;");
       	$('#day-two-forecast-temp-lo').html(dayTwoMinFar + "&deg;");
       	$('#day-three-forecast-temp-hi').html(dayThreeMaxFar + "&deg;");
       	$('#day-three-forecast-temp-lo').html(dayThreeMinFar + "&deg;");
       	$('#day-four-forecast-temp-hi').html(dayFourMaxFar + "&deg;");
       	$('#day-four-forecast-temp-lo').html(dayFourMinFar + "&deg;");
       	$('#day-five-forecast-temp-hi').html(dayFiveMaxFar + "&deg;");
       	$('#day-five-forecast-temp-lo').html(dayFiveMinFar + "&deg;");
    }
    else {
		$('#current-temp').addClass('.current-temp').removeClass('.current-temp-far').html(currentTemp + "&deg;");
    	$('.high-temp-left').html(maxTemp + "&deg;");
    	$('.low-temp-left').html(minTemp + "&deg;");
       	$('#day-one-forecast-temp-hi').html(dayOneMax + "&deg;");
       	$('#day-one-forecast-temp-lo').html(dayOneMin + "&deg;");
       	$('#day-two-forecast-temp-hi').html(dayTwoMax + "&deg;");
       	$('#day-two-forecast-temp-lo').html(dayTwoMin + "&deg;");
       	$('#day-three-forecast-temp-hi').html(dayThreeMax + "&deg;");
       	$('#day-three-forecast-temp-lo').html(dayThreeMin + "&deg;");
       	$('#day-four-forecast-temp-hi').html(dayFourMax + "&deg;");
       	$('#day-four-forecast-temp-lo').html(dayFourMin + "&deg;");
       	$('#day-five-forecast-temp-hi').html(dayFiveMax + "&deg;");
       	$('#day-five-forecast-temp-lo').html(dayFiveMin + "&deg;");

    }


});
});
})
}
 // Finish doing everything

  });


