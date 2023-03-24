const API_KEY = 'e76e96334db69c93dd05979abd9b8247';

const error = document.getElementById('error');

const form = document.getElementById('form');
const input = document.getElementById('search-city');

const description = document.getElementById('description');
const city = document.getElementById('city');
const country = document.getElementById('country');
const temp = document.getElementById('temp');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const windSpeed = document.getElementById('wind-speed');
const windDeg = document.getElementById('wind-deg');
const visibility = document.getElementById('visibility');

const defaultCity = 'London';

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!input.value) {
        error.style.display = 'flex';
        error.textContent = 'Please, enter a city name!';
        return;
    }

    fetchWeather(input.value)
    .then(weather => {
        updateUI(weather);
    })
    .catch(err => console.error(err));
});

async function fetchWeather(city) {
    const weather = {};
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    if (response.status === 404) {
        weather.error = 'Location not found.';
    } else if (response.status === 200) {
        const data = await response.json();
        weather.data = await processData(data);
    } else {
        weather.error = 'Something unexpected happened. Please try again.';
    }

    return weather;
}

async function processData(data) {
    const weatherData = {
        descMain: data.weather[0].main,
        desc: data.weather[0].description,
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp.toFixed(1),
        feelsLike: data.main.feels_like.toFixed(1),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        windDeg: data.wind.deg,
        visibility: data.visibility
    };

    return weatherData;
}

async function updateUI(weatherData) {
    console.log(weatherData);

    if (weatherData.error) {
        error.style.display = 'flex';
        error.textContent = weatherData.error;
        return;
    }

    error.style.display = 'none';
    error.textContent = '';

    description.textContent = weatherData.data.descMain;
    description.textContent += ', ' + weatherData.data.desc;
    city.textContent = weatherData.data.city;
    country.textContent = weatherData.data.country;
    temp.textContent = weatherData.data.temp;
    feelsLike.textContent = weatherData.data.feelsLike;
    humidity.textContent = weatherData.data.humidity;
    pressure.textContent = weatherData.data.pressure;
    windSpeed.textContent = weatherData.data.windSpeed + '';
    windDeg.textContent = weatherData.data.windDeg + '';
    visibility.textContent = weatherData.data.visibility / 1000;
}

fetchWeather(defaultCity)
.then(weather => {
    updateUI(weather);
})
.catch(err => console.error(err));
