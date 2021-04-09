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

function displayTemperature (response){
let temperatureElement= document.querySelector("#temperature");
let cityElement= document.querySelector("#city");
let descriptionElement= document.querySelector("#description");
let humidityElement= document.querySelector("#humidity");
let windElement= document.querySelector("#wind");
let timeElement= document.querySelector("#dayTime")
temperatureElement.innerHTML= Math.round (response.data.media.temp);
cityElement.innerHTML= response.data.name;
descriptionElement.innerHTML= response.data.weather[0].description;
humidityElement.innerHTML= response.data.main.humidity;
windElement.innerHTML= Math.round (response.data.wind.speed);
timeElement.innerHTML= formatDate(response.data.dt * 1000);
}

function search(city){

    let apikey="9a3263bb7dd95aedc9d9609db37bad89";
    let city= "Mexico";
    let apiUrl= `https://api.openweathermap.org/data/2.5/weather?
        q={city}&appid={apikey}&units=metric`;
        
axios.get(apiUrl). then(displayTemperature);
}
function countryData(){
    event.preventDefault();
     let city = document.querySelector("#search-input");
    search (city).value

}



let form= documen.querySelector("#search");
form.addEventListener("submit", countryData);