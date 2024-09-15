import "./styles.css";
import holdon from "./weather-icons/hold-on.gif";

import {
  searchBtn,
  input,
  card,
  icon,
  reportedLocation,
  day,
  temp,
  description,
  wind,
  humidity,
  visibility,
  websitedown,
} from "./dom";

let location = input.value;

card.classList.add("invisible");

async function getWeatherData() {
  location = input.value;
  icon.src = holdon;
  // const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=WK2ZSHB8ZA7KDC7Z72Z493WGN`;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=WK2ZSHB8ZA7KDC7Z72Z493WGN&contentType=json`;
  const response = await fetch(url, { mode: "cors" });
  const weatherData = await response.json();
  return weatherData;
}

const fillUI = async function () {
  try {
    websitedown.classList.add("invisible");
    const data = await getWeatherData();
    card.classList.remove("invisible");
    reportedLocation.textContent = data.resolvedAddress;
    const [dayName, month, date, year, ...discard] = new Date(
      data.days[0].datetime,
    )
      .toDateString()
      .split(" ");
    day.textContent = `${dayName} ${month} ${date} ${year}`;
    temp.textContent = `${data.days[0].temp} °C`;
    description.textContent = data.days[0].description;
    wind.textContent = data.days[0].windspeed;
    humidity.textContent = data.days[0].humidity;
    visibility.textContent = data.days[0].visibility;
    const iconInfo = data.days[0].icon;
    const iconPath = await import(`./weather-icons/${iconInfo}.svg`);
    icon.src = iconPath.default;
    console.log(data);
  } catch (error) {
    card.classList.add("invisible");
    websitedown.classList.remove("invisible");
  }
};

searchBtn.addEventListener("click", fillUI);
