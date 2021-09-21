const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const timezone2 = document.getElementById('time-zone2');
const countryEl2 = document.getElementById('country2');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const API_KEY  ='f8d019e545c9639f82c87e5d60232582'

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0' +hoursIn12HrFormat: hoursIn12HrFormat) + ':' + (minutes < 10? '0' + minutes: minutes) + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
}, 1000);

getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let{latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            
        console.log(data)

        showWeatherData(data);
        })
    })
}

function showWeatherData(data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current
    
    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N\n' + data.lon + 'E'
    timezone2.innerHTML = data.timezone;
    countryEl2.innerHTML = data.lat + 'N\n' + data.lon + 'E'

    currentWeatherItemsEl.innerHTML =
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format('HH:mm')}</div>
    </div>`;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <div class="temp">Day: ${day.temp.day}&#176; C</div>
                <div class="temp">Night: ${day.temp.night}&#176; C</div>
            </div>`
        }
        else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Day: ${day.temp.day}&#176; C</div>
                <div class="temp">Night: ${day.temp.night}&#176; C</div>
            </div>`
        }
    })

    weatherForecastEl.innerHTML = otherDayForcast;

}

var button = document.querySelector('.findbtn')
var inputValue = document.querySelector('.inputValue')
var namee = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humid = document.querySelector('.humid');
var pressure = document.querySelector('.pressure');

button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=45ca088ffb263f8dbd34e380cb9a89d8')
    .then(response => response.json())
    .then(data => {
        var nameValue = data['name'];
        var tempValue = data['main']['temp'];
        var descValue = data['weather'][0]['description'];
        var windValue = data['wind']['speed'];
        var humidValue = data['main']['humidity'];
        var pressureValue = data['main']['pressure'];
            
        namee.innerHTML = nameValue;
        temp.innerHTML = tempValue;
        desc.innerHTML = descValue;
        wind.innerHTML = windValue;
        humid.innerHTML = humidValue;
        pressure.innerHTML = pressureValue;
    
        console.log(data);
        })
    
    .catch(err => alert("Wrong City name!"))
})