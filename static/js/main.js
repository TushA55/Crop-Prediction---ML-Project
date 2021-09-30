var nitrogen = document.getElementById("N");
var phosphorus = document.getElementById("P");
var potassium = document.getElementById("K");

var temperature = document.getElementById("temperature");
var humidity = document.getElementById("humidity");
var rainfall = document.getElementById("rainfall");

var ph = document.getElementById("ph");

var crop_name = document.getElementById("crop-name");
crop_name.innerHTML = "?";

document.getElementById("Nvalue").innerHTML = nitrogen.value;
document.getElementById("Pvalue").innerHTML = phosphorus.value;
document.getElementById("Kvalue").innerHTML = potassium.value;

document.getElementById("temperatureValue").innerHTML = temperature.value + " °C";
document.getElementById("humidityValue").innerHTML = humidity.value;
document.getElementById("rainfallValue").innerHTML = rainfall.value + " mm";

document.getElementById("phValue").innerHTML = ph.value;

function getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getCropName() {
    data = {
        N: nitrogen.value,
        P: phosphorus.value,
        K: potassium.value,
        temperature: temperature.value,
        humidity: humidity.value,
        rainfall: rainfall.value,
        ph: ph.value
    }
    fetch("http://localhost:5000/predict_crop", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        crop_name.innerHTML = data.crop;
        hexcolor = getRandomColor();
        if (getContrastYIQ(hexcolor) == 'white') {
            crop_name.style.color = "white"
        } else {
            crop_name.style.color = "black"
        }
        crop_name.style.backgroundColor = hexcolor;
    })
}

nitrogen.onchange = getCropName
phosphorus.onchange = getCropName
potassium.onchange = getCropName
temperature.onchange = getCropName
humidity.onchange = getCropName
rainfall.onchange = getCropName
ph.onchange = getCropName

nitrogen.oninput = function () {
    document.getElementById("Nvalue").innerHTML = nitrogen.value;
}

phosphorus.oninput = function () {
    document.getElementById("Pvalue").innerHTML = phosphorus.value;
}

potassium.oninput = function () {
    document.getElementById("Kvalue").innerHTML = potassium.value;
}


temperature.oninput = function () {
    document.getElementById("temperatureValue").innerHTML = temperature.value + " °C";
}


humidity.oninput = function () {
    document.getElementById("humidityValue").innerHTML = humidity.value;
}


rainfall.oninput = function () {
    document.getElementById("rainfallValue").innerHTML = rainfall.value + " mm";
}

ph.oninput = function () {
    document.getElementById("phValue").innerHTML = ph.value;
}

github_icon = document.getElementsByClassName("bxl-github")[0];
github_icon.onclick = function () {
    window.open("https://github.com/TushA55", "_blank");
}
linkedin_icon = document.getElementsByClassName("bxl-linkedin-square")[0];
linkedin_icon.onclick = function () {
    window.open("https://www.linkedin.com/in/tusharrr", "_blank");
}