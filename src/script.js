$(document).ready(function () {
  function setCookie(name, value, minutesToExpire) {
    const now = new Date();
    now.setTime(now.getTime() + minutesToExpire * 60 * 1000);
    const expires = now.toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/;`;
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(";").filter((v) => v.includes(nameEQ));
    if (cookies.length == 0 || cookies[0].split("=")[1] == "null") return false;
    return cookies[0].split("=")[1];
  }

  function setWeatherData(data) {
    const {
      current: {
        condition: { text },
        gust_kph,
        feelslike_c,
      },
      location: { name },
    } = data;
    $("#city").text(name);
    $("#wind").text(gust_kph + "km/h");
    $("#weather").text(text);
    $("#degree").text(feelslike_c + "°");
  }

  // cek cookie
  let cookie = getCookie("city");
  if (!cookie) {
    const url = "http://ip-api.com/json/";
    $.get(
      url,
      function (data) {
        setCookie("city", data.city, 10);
      },
      "json"
    );
  }

  // set weather data
  cookie = getCookie("city");
  const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cookie}&aqi=no`;
  $.get(
    weatherUrl,
    function (data) {
      setWeatherData(data);
    },
    "json"
  );

  // search weather data
  const debouncedHandleInput = $.debounce(2000, (e) => {
    const city = e.target.value;
    if (city != "") {
      const searchWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
      $("#loading").toggleClass("hidden");
      $.get(
        searchWeatherUrl,
        function (data) {
          $("#loading").toggleClass("hidden");
          setWeatherData(data);
        },
        "json"
      );
    }
  });
  $("#search").on("keydown", debouncedHandleInput);
});
