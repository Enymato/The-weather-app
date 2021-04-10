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
     "Tueday",
     "Wednesday",
     "Thursday",
    "Friday",
    "Saturday"
];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;

}
function displayForecast(){
    let selectForecastElement= document.querySelector("#forecast");
    let forecastHTML= `<div class="row">`;
    let daysTwo=[ "Thu", "Fri", "Sat", "Sun"];
    daysTwo.forEach(function(day) {

        forecastHTML= forecastHTML +`
     <div class="col-2">
        <div class="dayWeather">
            ${day}
        </div>
        <div>
            <img src="https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png">
        </div>
        <div class="forecast-temperature">
            <span class="forecast-temperature-max"> 20° </span>
            <span class="forecast-temperature-min"> 8° </span>
        </div>
    </div>
    `;
    });
     
    forecastHTML= forecastHTML + ` </div>`;
    selectForecastElement.innerHTML= forecastHTML;


}

function displayTemperature (response){
let temperatureElement= document.querySelector("#temperature");
let cityElement= document.querySelector("#city");
let descriptionElement= document.querySelector("#description");
let humidityElement= document.querySelector("#humidity");
let windElement= document.querySelector("#wind");
let timeElement= document.querySelector("#dayTime")



celsiusTemperature= response.data.main.temp;
temperatureElement.innerHTML= Math.round (response.data.media.temp);
cityElement.innerHTML= response.data.name;
descriptionElement.innerHTML= response.data.weather[0].description;
humidityElement.innerHTML= response.data.main.humidity;
windElement.innerHTML= Math.round (response.data.wind.speed);
timeElement.innerHTML= formatDate(response.data.dt * 1000);
}

function search(city){

    let apikey="9a3263bb7dd95aedc9d9609db37bad89";
    let apiUrl= `https://api.openweathermap.org/data/2.5/weather?
        q={city}&appid={apiKey}&units=metric`;
      axios.get(apiUrl).then(displayTemperature);
}
function countryData(){
    event.preventDefault();
     let city = document.querySelector("#search-input");
    search (city).value

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


displayForecast();

let form= document.querySelector("#search");
form.addEventListener("submit", countryData);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Mexico");