if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    alert("Geolocation is not supported by this browser.");
}

function showPosition(position) {
    globalThis.lat = position.coords.latitude;
    globalThis.lon = position.coords.longitude;
    globalThis.time = Intl.DateTimeFormat().resolvedOptions().timeZone;
    globalThis.url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max&daily=temperature_2m_min&daily=weathercode&daily=sunrise&daily=sunset&daily=windspeed_10m_max&daily=winddirection_10m_dominant&timezone=${time}`;
    rest();

}

function rest() {
    console.log(lat, lon, url);


    async function getWeatherByLocation(city) {

        const resp = await fetch(url, {
            origin: "cros"
        });
        globalThis.respData = await resp.json();
        document.getElementById("loading").style.display = "none";
        document.getElementById("main").style.display = "block";
        addWeatherToPage(respData);
        console.log(respData);
    }
    getWeatherByLocation()

    function trueRound(value, digits) {
        return (Math.round((value * Math.pow(10, digits)).toFixed(digits - 1)) / Math.pow(10, digits)).toFixed(digits);
    }
    document.getElementById("lon").innerHTML = trueRound(lon, 3);
    document.getElementById("lat").innerHTML = trueRound(lat, 3);
    var currDate = Date.now();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    document.getElementById("date").innerHTML = today;
    const weathercode = {
        0: "Clear Sky",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light Drizzle",
        53: "Moderate Drizzle",
        55: "Dense Drizzle",
        56: "Light Freezing Drizzle",
        57: "Dense Freezing Drizzle",
        61: "Slight Rain",
        63: "Moderate Rain",
        65: "Heavy Rain",
        71: "Slight Snow Fall",
        73: "Moderate Snow Fall",
        75: "Heavy Snow Fall",
        77: "Snow Grains",
        80: "Slight Rain Showers",
        81: "Moderate Rain Showers",
        82: "Heavy Rain Showers",
        85: "Slight Snow Showers",
        86: "Heavy Snow Showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    }
    const weatherimg={
        0: "img/1.png",
        1: "img/2.png",
        2: "img/3.png",
        3: "img/4.png",
        45: "img/5.png",
        48: "img/5.png",
        51: "img/6.png",
        53: "img/7.png",
        55: "img/8.png",
        56: "img/7.png",
        57: "img/8.png",
        61: "img/9.png",
        63: "img/9.png",
        65: "img/10.png",
        71: "img/11.png",
        73: "img/11.png",
        75: "img/12.png",
        77: "img/11.png",
        80: "img/11.png",
        81: "img/8.png",
        82: "img/10.png",
        85: "img/12.png",
        86: "img/12.png",
        95: "img/13.png",
        96: "img/14.png",
        99: "img/14.png",
    }
    function addWeatherToPage(respData) {
        var currDate = Date.now();
        var today = new Date(currDate);
        var x = today.getDay();
        document.getElementById("temp_max").innerHTML = String(respData["daily"]["temperature_2m_max"][0]) + "°C";
        document.getElementById("temp_min").innerHTML = String(respData["daily"]["temperature_2m_min"][0]) + "°C";
        document.getElementById("wmo").innerHTML = weathercode[respData["daily"]["weathercode"][0]];
        document.getElementById('wind').innerHTML=String(respData["daily"]["windspeed_10m_max"][0]) + "kmph";
        document.getElementById("dir").innerHTML=String(respData["daily"]["winddirection_10m_dominant"][0]) + "°";
        document.getElementById("sun_rise").innerHTML=String(respData["daily"]["sunrise"][0]).slice(11,);
        document.getElementById("sun_set").innerHTML=String(respData["daily"]["sunset"][0]).slice(11,);
        document.getElementById("w_img").src = weatherimg[respData["daily"]["weathercode"][0]];
        document.getElementById("t_day").innerHTML = days[x];
        var f_day = document.getElementsByClassName("day");
        var temp_max = document.getElementsByClassName("temp_max");
        var temp_min = document.getElementsByClassName("temp_min");
        var wmo = document.getElementsByClassName("wmo");
        var w_img = document.getElementsByClassName("w_img");
        for (let i = 0; i < 5; i++) {
            x += 1;
            if (x == 7) {
                x = 0
            }
            f_day[i].innerHTML = days[x];
            temp_max[i].innerHTML = String(respData["daily"]["temperature_2m_max"][i + 1]) + "°C";
            temp_min[i].innerHTML = String(respData["daily"]["temperature_2m_min"][i + 1]) + "°C";
            wmo[i].innerHTML = String(weathercode[respData["daily"]["weathercode"][i + 1]]);
            w_img[i].src=weatherimg[respData["daily"]["weathercode"][i+1]];
        }

    }
}