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
	var weatherDescription = wd.currently.summary;
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


if (weatherDescription == "light rain" || "light intensity shower rain" || "shower rain") {
	$("#weather-icon-wrapper-left").html('<i class="wi wi-day-showers"></i>');
}


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

	var dayOneWeather = wd.daily.data[1].summary;
	var dayTwoWeather = wd.daily.data[2].summary;
	var dayThreeWeather = wd.daily.data[3].summary;
	var dayFourWeather = wd.daily.data[4].summary;
	var dayFiveWeather = wd.daily.data[5].summary;



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

    if (weatherDescription.includes("Cloudy")) {
$('#weather-icon-wrapper-left').html("<i class='wi wi-day-cloudy current-weather-icon'></i>");
console.log("cloudy today");
    }
});
});
// Change icons depending on weather

//if (weatherDescription =  


})
}
 // Finish doing everything

  });


