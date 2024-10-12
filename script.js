const apiKey = "35fc8bc9ab3ac584a62e8117cd1edb3a";
const searchBox = document.querySelector(".search input");
const searchBtn = document.getElementById("searchButton");
const weatherIcon = document.querySelector(".weather-icon");

checkWeather("pune");

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();
      console.log("Response from API: ", data);

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML =
        data.main.humidity + "%";
      document.querySelector(".wind").innerHTML =
        data.wind.speed + " km/h";

      // Update weather icon based on the weather condition
      const weatherCondition = data.weather[0].main;
      if (weatherCondition === "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (weatherCondition === "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (weatherCondition === "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (weatherCondition === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (weatherCondition === "Mist") {
        weatherIcon.src = "images/mist.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.log("Error fetching weather data:", error);
  } finally {
    loading = false;
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  checkWeather(city);
});

searchBox.addEventListener("keydown", () => {
  if (event.key === "Enter") {
    const city = searchBox.value;
    checkWeather(city);
  }
});