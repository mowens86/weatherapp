//////////////////////////
// JS 


// 1. Create weather function
const weatherCall = ( zipcode ) => {
    
   // create var to hold api key
    const key = '0bead765aab24bc26bd502390339b54d';
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&appid=${key}`;

    // fetch api call
    fetch(url)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {

        // TESTING LOG
        //console.log(data);

        // Call weatherCalc function
        weatherCalc(data);

    })
    .catch(function() {
        //catch any errors
    });
};

// 2. Initiate api call on window load and load saved data from sessionStorage
window.onload = function() {
    weatherCall( sessionStorage.userzip );
};

// 3. Create variable to select the Check the Weather button
const submitButton = document.querySelector('button');

// Add eventlistener to hear for a click 
submitButton.addEventListener('click', function() {

    // Create variable to hold the value of the zipcode typed in by user
    const zipcode = document.getElementById('zip').value;

    // Add the zipcode variable to Sessionstorage so the data gets saved and reloaded
    sessionStorage.setItem("userzip", zipcode);

    // Call weatherCall function after all steps complete
    weatherCall(zipcode);
});

// 4. Create weather calculations function
const weatherCalc = ( e ) => {
    
    // Create variable to hold description of weather
    let weatherStat = e.weather[0].main;
    
    // add in city
    document.getElementById('name').innerHTML = e.name;

    // add in description
    document.getElementById('description').innerHTML = weatherStat;
    
    // If statement to swap picture based on weather
    if (weatherStat === "Mist"
        || weatherStat === "Smoke" 
        || weatherStat === "Haze" 
        || weatherStat === "Dust" 
        || weatherStat === "Fog" 
        || weatherStat === "Sand" 
        || weatherStat === "Ash" 
        || weatherStat === "Squall" 
        || weatherStat === "Tornado" 
        || weatherStat === "Clouds") {
        document.getElementById('weatherstatus').src = 'img/cloudy.png';
    } else if (weatherStat === "Thunderstorm") {
        document.getElementById('weatherstatus').src = 'img/thunderstorm.png';
    } else if (weatherStat === "Drizzle" 
        || weatherStat === "Rain") {
        document.getElementById('weatherstatus').src = 'img/rainy.png';
    } else if (weatherStat === "Snow") {
        document.getElementById('weatherstatus').src = 'img/snow.png';
    } else {
        document.getElementById('weatherstatus').src = 'img/sunny.png';
    }

    // add in temperature
    document.getElementById('temp').innerHTML = `${Math.round(e.main.temp)}&degF`;

    // add in humidity
    document.getElementById('humidity').innerHTML = `Humidity: ${e.main.humidity}%`;

    // add in wind speed
    document.getElementById('wind').innerHTML = `Wind: ${Math.round(e.wind.speed)} mph`;
};

