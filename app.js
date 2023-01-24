const apiKey = "e76e96334db69c93dd05979abd9b8247";

async function getWeather(city, units) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    const response = await fetch(apiUrl, { mode: "cors" });
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error(error);
  }
}

