var apiKey = "0591d419f68f0d08f7f996edae3e93c6";
var cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=${apiKey}`;

fetch(cityUrl)
  .then(function (response) {
    if (response.ok) {
      return response.json();
      // console.log(response.json());
    }
  })
  .then(function (data) {
    console.log(data.coord.lat);
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    var latLon = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`;
    fetch(latLon)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (data) {
        console.table(data.current);
        var { temp, uvi } = data.current;
        random({ temp, uvi });
      });
  });
function random(data) {
  console.log(data);
}
