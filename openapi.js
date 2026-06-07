const weatherData = document.getElementById("weatherData");

const tempBtn = document.getElementById("tempBtn");
const conditionBtn = document.getElementById("conditionBtn");
const searchBtn = document.getElementById("searchBtn");

const cityInput = document.getElementById("cityInput");

let latitude = 36.1;
let longitude = -79.4;
let cityName = "Burlington";

// SEARCH CITY //
searchBtn.addEventListener("click", () => {
  const city = cityInput.value;

  if (city === "") {
    weatherData.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.results) {
        weatherData.innerHTML = `<p>City not found.</p>`;
        return;
      }

      latitude = data.results[0].latitude;
      longitude = data.results[0].longitude;
      cityName = data.results[0].name;

      weatherData.innerHTML = `
                <h2>${cityName}</h2>
                <p>City loaded successfully!</p>
            `;
    })
    .catch((error) => {
      weatherData.innerHTML = `<p>Error searching for city.</p>`;
      console.log(error);
    });
});

// TEMPERATURE REQUEST //
tempBtn.addEventListener("click", () => {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
  )
    .then((response) => response.json())
    .then((data) => {
      const tempC = data.current.temperature_2m;

      // Convert Celsius to Fahrenheit //
      const tempF = (tempC * 9) / 5 + 32;

      weatherData.innerHTML = `
                <h2>${cityName} Temperature</h2>
                <p>${tempC.toFixed(1)} °C</p>
                <p>${tempF.toFixed(1)} °F</p>
            `;
    })
    .catch((error) => {
      weatherData.innerHTML = `<p>Error loading temperature data.</p>`;
      console.log(error);
    });
});

// CONDITIONS REQUEST //
conditionBtn.addEventListener("click", () => {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code`,
  )
    .then((response) => response.json())
    .then((data) => {
      const code = data.current.weather_code;

      let condition = "Unknown";

      if (code === 0) {
        condition = "Clear Sky";
      } else if (code <= 3) {
        condition = "Cloudy";
      } else if (code <= 67) {
        condition = "Rainy";
      } else {
        condition = "Stormy";
      }

      weatherData.innerHTML = `
                <h2>${cityName} Weather</h2>
                <p>${condition}</p>
            `;
    })
    .catch((error) => {
      weatherData.innerHTML = `<p>Error loading weather conditions.</p>`;
      console.log(error);
    });
});
