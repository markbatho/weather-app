const API_KEY = 'e76e96334db69c93dd05979abd9b8247';

const error = document.getElementById('error');
const city = document.getElementById('city');
const country = document.getElementById('country');
const temp = document.getElementById('temp');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const windSpeed = document.getElementById('wind-speed');
const windDeg = document.getElementById('wind-deg');

async function fetchWeather(city) {
    const weather = {};
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    if (response.status === 404) {
        weather.error = 'Location not found';
    } else if (response.status === 200) {
        const data = await response.json();
        weather.data = await processData(data);
    } else {
        weather.error = 'Something unexpected happened';
    }

    return weather;
}

async function processData(data) {
    const weatherData = {
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        windDeg: data.wind.deg
    };

    return weatherData;
}

async function updateUI(weatherData) {
    if (weatherData.error) {
        error.textContent = weatherData.error;
        return;
    }

    error.textContent = '';

    city.textContent = weatherData.data.city;
    country.textContent = weatherData.data.country;
    temp.textContent = weatherData.data.temp;
}

fetchWeather('Londonsa')
.then(weather => {
    console.log(weather);
    updateUI(weather);
})
.catch(err => console.error(err));
