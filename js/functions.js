// get and show the daily quote
const showDailyQuote = () => {
  // geting the daily quote
  $.ajax({
    method: "GET",
    async: true,
    url: "https://uselessfacts.jsph.pl//random.json?language=en",
    dataType: "json",
    success: function (data) {
      console.log(data.text);
      $(".daily-fact").html(`
          <h3>daily random fact</h3>
          <p>"${data.text}"</p>
      `);
    },
    error: function (xhr, status, err) {
      console.log(err);
    },
  });
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      successfullLocation,
      errorLocation
    );
  } else {
    alert(
      "It seems like Geolocation, which is required for this page, is not enabled in your browser."
    );
  }
};

function successfullLocation(location) {
  const long = location.coords.longitude;
  const lat = location.coords.latitude;

  getWeather(apiKeys.weatherApi, lat, long);
}

function errorLocation(err) {
  return "err";
}

function getWeather(key, lat, long) {
  $.ajax({
    method: "GET",
    async: true,
    url: `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${long}&aqi=no`,
    dataType: "json",
    success: function (data) {
      $(".weather").html(`
            <img class="weather__img" src="${data.current.condition.icon}" />
            <p class="weather__temp">${Math.floor(
              data.current.temp_f
            )}&#x2109;</p>
            <p class="weather__region">${data.location.region}</p>
        `);
      console.log(data.location.region);
      console.log(data.current.condition.icon);
      console.log(Math.floor(data.current.temp_f));
    },
    error: function (xhr, status, err) {
      $(".weather").css("display", "none");
    },
  });
}
