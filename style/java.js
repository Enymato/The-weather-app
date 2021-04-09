function displayTemperature (response){
let temperatureElement= document.querySelector("#temperature");
let cityElement= document.querySelector("#city");
let descriptionElement= document.querySelector("#description");
let humidityElement= document.querySelector("#humidity");
let windElement= document.querySelector("#wind");
temperatureElement.innerHTML= Math.round (response.data.media.temp);
cityElement.innerHTML= response.data.name;
descriptionElement.innerHTML= response.data.weather[0].description;
humidityElement.innerHTML= response.data.main.humidity;
windElement.innerHTML= Math.round (response.data.wind.speed);
}



let apikey="ddaf6a178fcca0c86aa8279f49640c8c";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?
q={city name}&appid={API key}&units=metric`;

axios.get(apiUrl). then(displayTemperature);