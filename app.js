//Form
var button = document.querySelector('.icon');
var input = document.querySelector('input');
//City & weather
var city = document.querySelector('#city');
var error = document.querySelector('#err');
var weather = document.querySelector('#weather');
//Loading
const loading = document.querySelector('#loading');
//Temperature
var currentTemp = document.querySelector('#current');
var minTemp = document.querySelector('#min');
var maxTemp = document.querySelector('#max');
//Info
var wind = document.querySelector('#wind');
var humidity = document.querySelector('#humidity');
var pressure = document.querySelector('#pressure');
var icon = document.querySelector('#weather-icon');

const apiKey = "6e798fea971c9c2d500622c06949a0a4";

function getWeather(URL) {
    city.innerHTML = "Loading";
    loading.className = "loading";
    fetch(URL)
        .then(function (response) {
            if (response.status >= 400) {
                error.innerHTML = "Error city not found";
                loading.classList.remove("loading");
                city.innerHTML = "City";
                throw new Error("City not found !")
            }
            error.innerHTML = "";
            return response.json(0)
        })
        .then(function (data) {
            city.innerHTML = data.name;
            weather.innerHTML = data.weather[0].description;
            currentTemp.innerHTML = Math.floor(data.main.temp);
            minTemp.innerHTML = Math.floor(data.main.temp_min);
            maxTemp.innerHTML = Math.floor(data.main.temp_max);

            wind.innerHTML = "Wind " + data.wind.speed + " m/s";
            humidity.innerHTML = "Humidity " + data.main.humidity + "%";
            pressure.innerHTML = "Pressure " + data.main.pressure + " hPa";

            icon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
            loading.classList.remove("loading");
        })
}

button.addEventListener("click", function() {
    if (input.value != "") {
        const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + input.value + "&appid=" + apiKey;
        getWeather(URL);
    }
    else {
        error.innerHTML = "Please enter a city name!";
    }
})