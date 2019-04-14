var city0 = 0;
var city1 = 0;
var city2 = 0;
var randName = "";
var randCode = "";
var randDetails = "";
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randCity() {
    var cityNum = randomInt(0, 3592);
    randName = cityNames[cityNum].city;
    randCode = cityNames[cityNum].name;
    // randDetails = initMap(randName);


    console.log(cityNames[cityNum].city);
    console.log(cityNames[cityNum].name);
    console.log(randDetails);
};

function addCity() {
    randCity();
    $("#city0").text(randName);
    // $("#text0").text(randDetails);


    randCity();
    $("#city1").text(randName);

    randCity();
    $("#city2").text(randName);

}

$(document).on("click", "#btn0", function () {
	mymap.flyTo([48.8, 2.4], 10, {
        animate: true,
        duration: 2 // in seconds
    });
});

$(document).on("click", "#btn1", function () {
	mymap.flyTo([51.5, 0], 10, {
        animate: true,
        duration: 2 // in seconds
    });
});

$(document).on("click", "#btn2", function () {
	mymap.flyTo([51.5, 0], 10, {
        animate: true,
        duration: 2 // in seconds
    });
});


addCity();

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FpcmljaGFyZHNvbiIsImEiOiJjanVmdGZwY2EwZTA5NDRucThtbjkwdXNoIn0.5SVT37RtNOBEEcyU2umFAQ'
}).addTo(mymap);


var queryURL = "http://api.geonames.org/searchJSON?username=ksuhiyp&country=us&maxRows=1000";

function city(params) {
  
}
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {        
  var results = response.data;

  console.log(response);
});
