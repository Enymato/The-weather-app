function formatDate (timestamp){
    let date = new Date(timestamp);
    let hours= date.getHours();
    if (hours < 10){
        hours=`0 ${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes=`0 ${minutes}`;
    }
    let days = [
     " Sunday",
     "Monday",
     "Tuesday",
     "Wednesday",
     "Thursday",
    "Friday",
    "Saturday"
];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
    let date= new Date (timestamp* 1000);
    let day = date.getDay();
    let days= ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    return days [day];

}

function displayForecast(response){
    console.log(response.data.daily);
    let forecast= response.data.daily;
    let selectForecastElement= document.querySelector("#forecast");
    let forecastHTML= `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
        if (index < 6){    
        forecastHTML= forecastHTML +`
     <div class="col-2">
        <div class="dayWeather">
            ${formatDay (forecastDay.dt)}
        </div>
        <div>
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png">
            
        </div>
        <div class="forecast-temperature">
            <span class="forecast-temperature-max"> <strong> ${Math.round (forecastDay.temp.max)} ° </strong></span>
            <span class="forecast-temperature-min"> ${Math.round (forecastDay.temp.min)}°</span>
        </div>
    </div>
    `;
    }
    });
     
    forecastHTML= forecastHTML + ` </div>`;
    selectForecastElement.innerHTML= forecastHTML;


}

function getForecast(coordinates){
    console.log(coordinates);
    let apikey="9a3263bb7dd95aedc9d9609db37bad89";
    let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
 
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature (response){
    console.log(response.data);
let temperatureElement= document.querySelector("#temperature");
let cityElement= document.querySelector("#city");
let descriptionElement= document.querySelector("#description");
let humidityElement= document.querySelector("#humidity");
let windElement= document.querySelector("#wind");
let timeElement= document.querySelector("#dayTime");
let iconElement= document.querySelector("#icon");


celsiusTemperature= response.data.main.temp;
temperatureElement.innerHTML= Math.round (response.data.main.temp);
cityElement.innerHTML= response.data.name;
descriptionElement.innerHTML= response.data.weather[0].description;
humidityElement.innerHTML= response.data.main.humidity;
windElement.innerHTML= Math.round (response.data.wind.speed);
timeElement.innerHTML= formatDate(response.data.dt * 1000);
iconElement.setAttribute(
    "src",
     `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
     );
      iconElement.setAttribute("alt", response.data.weather[0].description);




getForecast(response.data.coord);

}



function search(city){

    let apikey="9a3263bb7dd95aedc9d9609db37bad89";
    let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
         console.log(apiUrl);
    axios.get(apiUrl).then(displayTemperature);
}
function countryData(event){
    event.preventDefault();
     let city = document.querySelector("#search-input");
     console.log(city.value);
    search (city.value);

}

function showFahrenheitTemperature(event){
   event.preventDefault();
    let temperatureNumber= document.querySelector("#temperature");
        celsiusLink.classList.remove("active");
        fahrenheitLink.classList.add("active");
    let fahrenheitTemperature= (celsiusTemperature * 9) / 5 + 32 ;
    temperatureNumber.innerHTML= Math.round (fahrenheitTemperature);

}

function showCelsiusTemperature(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
        fahrenheitLink.classList.remove("active");
    let temperatureNumber= document.querySelector("#temperature");
    temperatureNumber.innerHTML= Math.round (celsiusTemperature);


}

let celsiusTemperature= null;


let form= document.querySelector("#search");
form.addEventListener("submit", countryData);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Mexico");