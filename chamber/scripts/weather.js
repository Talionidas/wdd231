const apiKey = "1035f755c34b684606b9dbed8b6efc1d";

const lat = 47.389;
const lon = 8.176;

const weatherURL =
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather(){

    const response = await fetch(weatherURL);
    const data = await response.json();
    displayWeather(data);

}

function displayWeather(data) {

    const current = document.querySelector("#current-weather");

    const icon = data.list[0].weather[0].icon;

    current.innerHTML = `
        <div class="weather-current">

            <img
                class="weather-icon"
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${data.list[0].weather[0].description}"
            >

            <h3>${Math.round(data.list[0].main.temp)}°C</h3>

            <p>${data.list[0].weather[0].description}</p>

            <p>
                Feels like ${Math.round(data.list[0].main.feels_like)}°C
            </p>

        </div>
    `;

    const forecast = document.querySelector("#forecast");

    forecast.innerHTML = "";

    const days = ["Tomorrow", "Day 2", "Day 3"];

    let day = 0;

    for (let i = 8; i <= 24; i += 8) {

        const div = document.createElement("div");

        div.className = "weather-day";

        div.innerHTML = `
            <h4>${days[day]}</h4>
            <p>${Math.round(data.list[i].main.temp)}°C</p>
        `;

        forecast.appendChild(div);

        day++;
    }

}

getWeather();