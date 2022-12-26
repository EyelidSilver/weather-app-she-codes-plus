//Weather API

// Displays current day and time

let now = new Date();
let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let day = weekDays[now.getDay()];

let hours = now.getHours();

let mins = now.getMinutes();

let weekDayTime = document.querySelector("#dayTime");

if (hours < 10) {
  hours = "0" + hours;
}
if (mins < 10) {
  mins = "0" + mins;
}
weekDayTime.innerHTML = `${day} ${hours}:${mins}`;

// this function displays fetched data

function showTemp(response) {
  console.log(response.data);

  // temperature
  let tempData = response.data.main.temp;

  //description
  let desciptionData = response.data.weather[0].description;

  //Humidity %
  let humidityData = response.data.main.humidity;

  //Wind speed
  let windData = response.data.wind.speed;

  // city name
  let cityNameData = response.data.name;

  // define the placeholders
  let weatherDescriptionHolder = document.querySelector("#description");
  let humidityHolder = document.querySelector("#humidity");
  let windHolder = document.querySelector("#wind");
  let tempHolder = document.querySelector("#temp-main");
  let cityHolder = document.querySelector("#city");

  // assign data to the placeholders
  tempHolder.innerHTML = Math.round(tempData);
  weatherDescriptionHolder.innerHTML = desciptionData;
  humidityHolder.innerHTML = `Humidity: ${humidityData}%`;
  windHolder.innerHTML = `Wind: ${Math.round(windData)} km/h`;
  cityHolder.innerHTML = cityNameData;
}

// Search engine

let form = document.querySelector("#form-input");

function search(city) {
  let apiKey = "";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

// Reads input (city name) and displays it
function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("#city");
  if (cityInput.value) {
    currentCity.innerHTML = cityInput.value;
  } else {
    alert("Choose a city");
  }

  // Gets weather data for input (city name) and sends it to a function - showTemp
  let cityCurrent = cityInput.value;
  search(cityCurrent);
}

form.addEventListener("submit", showCity);

// show the current temperature with the current location

//define the button
let btnCurrent = document.querySelector("#currentButton");

function showCurrentTempInCurrentLoc(event) {
  event.preventDefault();

  function handlePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // check if it works
    console.log(`latitude is ${latitude}, longitude is ${longitude}`);

    let apiKey = "";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemp);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}

btnCurrent.addEventListener("click", showCurrentTempInCurrentLoc);

search("Yakutsk");
