var cityArr = [
    {
        city: "",
        name: ""
    },
    {
        city: "",
        name: ""
    },
    {
        city: "",
        name: ""
    }];

var city0 = "";
var city1 = "";
var city2 = "";
var randName = "";
var randCode = "";
var randDetails = "";
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
var cityPic = "";

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randCity() {

    for (let i = 0; i < cityArr.length; i++) {

        var cityNum = randomInt(0, 3592);
        cityArr[i].city = cityNames[cityNum].city;
        cityArr[i].name = cityNames[cityNum].name;


    }
};

function addCity() {
    randCity();
    $("#city0").text(cityArr[0].city);
    // $("#text0").text(randDetails);
    locationPic();
    console.log("This is cityPic" + cityPic);
    
    $("#city1").text(cityArr[1].city);
    
    $("#city2").text(cityArr[2].city);


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

addCity();

function locationPic() {
    for (let i = 0; i < cityArr.length; i++) {
    
    
    console.log("my random city " + cityArr[i]);
    console.log(cityArr[i].city.split(", "));
    var randCitySplit = cityArr[i].city.split(", ");
    
    var APIkey = "71bffe063e7e7b08081853a39bb1a26e324af8bafbf84cb28f79e4f75b19cab6";
    
    var queryURL = "https://api.unsplash.com/search/photos?query=" + randCitySplit[1] + "&client_id=" + APIkey;
    console.log("my query is:" + queryURL);
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then(function (response) {
        // var results = response.data;
        
        console.log(queryURL);
        console.log(response);
        // console.log(results);
        
        // if I dont get any results from city I want an ajax call for the country. I can get the city name by randCitySplit[0], and country from randCitySplit[1]
        // if (randCitySplit[0]) {};
        
    
        
        cityPic = response.results[0].urls.thumb;
        // console.log("This is cityPic:" + cityPic);
        $("#deal-pic" + i).attr("src", cityPic);
        // $("#deal-pic1").attr("src", cityPic);
        // $("#deal-pic2").attr("src", cityPic);
        
        
    });
}
};
