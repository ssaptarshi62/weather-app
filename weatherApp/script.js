const apiKey = `cf5932be85a9f0c3fb57694c547ca82d`;
// const city ="New York";
async function fetchWeatherData(city) {
 try {  const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if(!responce.ok){
        throw new Error("Unable to fetch weather data");
        
    }

    const data = await responce.json();
    console.log(data);
    // console.log(data.main.temp);
    // console.log(data.name);
    // console.log(data.wind.speed);
    // console.log(data.main.humidity);
    // console.log(data.visibility);
    updateWeatherUi(data);
}
catch(error){
    console.error(error);   
}
}


const cityElement=document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility");

const descriptionText = document.querySelector(".description-text");
const date =document.querySelector(".date");
const descriptionIcon = document.querySelector("#weather-icon");



function updateWeatherUi(data){
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent =` ${data.main.humidity}%`;
    visibility.textContent =`${data.visibility/1000} km`;
    descriptionText.textContent = data.weather[0].description;
    

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();

    // 
    const weatherIconName = getWeatherIconName(data.weather[0].main);  
    descriptionIcon.innerHTML = `<span class="material-symbols-outlined" id="weather-icon">${weatherIconName}</span>`;
    // 
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");


formElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    }
}) ;

function getWeatherIconName(weatherCondition){
    const iconMap ={
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help"
}