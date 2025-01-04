const apiKey = "bf01f5642360a4b5b1f3e07102889f35";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityName = document.querySelector(".city");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");

const getWeather = async (city) => {
  const res = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (res.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".error-message").innerHTML =
      "Invalid city name detected!";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await res.json();
    //console.log(data);
    const tempIcon = data.weather[0].main;

    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".country").innerHTML = data.sys.country;
    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".description").innerHTML =
      data.weather[0].description;

    switch (tempIcon) {
      case "Rain":
        weatherIcon.src = "./imgs/rain.png";
        break;
      case "Clear":
        weatherIcon.src = "./imgs/sun.png";
        break;
      case "Clouds":
        weatherIcon.src = "./imgs/sun-cloud.png";
        break;
      case "Drizzle":
        weatherIcon.src = "./imgs/weather.png";
        break;
      case "Mist":
        weatherIcon.src = "./imgs/weather1.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
};

searchBtn.addEventListener("click", () => {
  //console.log(cityName.value);
  if (cityName.value == "") {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".error-message").innerHTML =
      "No city name informated!";
    document.querySelector(".weather").style.display = "none";
  } else {
    getWeather(cityName.value);
  }
});

cityName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (cityName.value == "") {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".error-message").innerHTML =
        "No city name informated!";
      document.querySelector(".weather").style.display = "none";
    } else {
      getWeather(cityName.value);
    }
  }
});
