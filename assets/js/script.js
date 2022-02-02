var apiKey = "0591d419f68f0d08f7f996edae3e93c6";
var cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=${apiKey}`;
var cities = [];
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#current-weather");
// var lat = data.coord.lat;
// var lon = data.coord.lon;
var apiKey = "0591d419f68f0d08f7f996edae3e93c6";

$("#search-btn").on("click", (event) => {
  event.preventDefault();
  var city = $("#city-name").val();
  formHandler(city);
});

var formHandler = function (city) {
  console.log("city: ", city);

  if (city) {
    getCityLatLong(city);
    get5DayForecastCity(city);
  } else {
    alert("Please enter the city");
  }
};

var getCityLatLong = function (city) {
  var cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(cityUrl).then(function (response) {
    console.log("response: ", response);
    if (response.ok) {
      return response.json().then(function (data) {
        console.log("data: ", data);
        getWeatherFromLatLong(data);
      });
    }
    // saveSearch();d
  });
};

var getWeatherFromLatLong = function (data) {
  var lat = data.coord.lat;
  var lon = data.coord.lon;

  var latLon = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=imperial&appid=${apiKey}`;

  fetch(latLon)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      console.table(data);
      // clear old element
      $("#current-weather").empty();
      displayCurrentWeather(data);
    });
};
var displayCurrentWeather = function (data) {
  var currentDate = document.createElement("span");
  currentDate.textContent = moment().format("MM/DD/YYYY");
  currentDate.classList = "list-group-item";
  $("#current-weather").append(currentDate);

  const { icon } = data.current.weather[0];
  var imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  console.log("imgUrl", imgUrl);
  var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
  img.attr("src", imgUrl);
  img.appendTo("#current-weather");
  const { temp, wind_speed, humidity, uvi } = data.current;

  var tempEl = document.createElement("span");
  tempEl.textContent = "Temperature: " + temp + "°F";
  tempEl.classList = "list-group-item";
  $("#current-weather").append(tempEl);

  var windEl = document.createElement("span");
  windEl.textContent = "Wind speed: " + wind_speed + "MPH";
  windEl.classList = "list-group-item";
  $("#current-weather").append(windEl);

  var humidEl = document.createElement("span");
  humidEl.textContent = " Humidity: " + humidity + "%";
  humidEl.classList = "list-group-item";
  $("#current-weather").append(humidEl);

  var uviEl = document.createElement("span");
  uviEl.textContent = "UV Index " + uvi;
  uviEl.classList = "list-group-item";
  $("#current-weather").append(uviEl);
};

var get5DayForecastCity = function () {
  var city = $("#city-name").val();
  var cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(cityUrl).then(function (response) {
    response.json().then(function (data) {
      console.log("5day", city);
      get5DayForecast(data);
    });
  });
};
var get5DayForecast = function (data) {
  var lat = data.coord.lat;
  var lon = data.coord.lon;

  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  fetch(forecastUrl)
    .then(function (response) {
      if (response.ok) {
        console.log("dataaa", data);
        return response.json();
      }
    })
    .then(function (data) {
      console.table(data);
      // clear old element
      $("#forecast-weather").empty();
      display5DayForecast(data);
    });
};
var display5DayForecast = function (data) {
  var forecastContainerEl = document.querySelector("#forecast-weather");
  forecastContainerEl.textContent = "";
  var forecastTitle = document.querySelector("#forecast-title");
  forecastTitle.textContent = "5-Day Forecast";
  var forecast = data.list;

  for (var i = 5; i < forecast.length; i = i + 8) {
    var dailyForecast = forecast[i];
    console.log("hihi", forecast[i]);

    var forecastDate = document.createElement("h5");
    forecastDate.textContent = moment
      .unix(dailyForecast.dt)
      .format("MMM D, YYYY");
    forecastDate.classList = "card-header text-center";
    $("#forecast-weather").append(forecastDate);

    var forecastIcon = document.createElement("img");
    forecastIcon.classList = "card-body text-center";
    forecastIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`
    );
    $("#forecast-weather").append(forecastIcon);

    var forecastTemp = document.createElement("span");
    forecastTemp.textContent = dailyForecast.main.temp + "°F";
    forecastTemp.classList = "card-header text-center";
    $("#forecast-weather").append(forecastTemp);

    var forecastWind = document.createElement("span");
    forecastWind.textContent = dailyForecast.wind.speed + "MPH";
    forecastWind.classList = "card-header text-center";
    $("#forecast-weather").append(forecastWind);

    var forecastHumid = document.createElement("span");
    forecastHumid.textContent = dailyForecast.main.humidity + "%";
    forecastHumid.classList = "card-header text-center";
    $("#forecast-weather").append(forecastHumid);
  }
};
