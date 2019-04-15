var cityArr = [{
    city: "",
    country: "",
    lat: 0,
    lng: 0,
},
{
    city: "",
    country: "",
    lat: 0,
    lng: 0,
},
{
    city: "",
    country: "",
    lat: 0,
    lng: 0,
}];

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

function cityInfo(cName, chars) {
    
    var wikiQueryURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=" + chars + "&explaintext=&titles=" + cName + "&format=json";
    
    $.ajax({
        url: wikiQueryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        
        return = results.query.pages
        console.log(response);
    });
}
    

function randCity() {

    for (let i = 0; i < cityArr.length; i++) {
        var cityNum = randomInt(0, 999);
        // var cityy = cityNames[cityNum].name;
            cityArr[i].city = cityNames[cityNum].city;
            cityArr[i].country = cityNames[cityNum].country;
            cityArr[i].lat = cityNames[cityNum].lat;
            cityArr[i].lng = cityNames[cityNum].lng;
    }
};

function addCity() {
    randCity();
    cityInfo(cityArr[0].city, chars)
    $("#city0").text(cityArr[0].city + ", " + cityArr[0].country);
    locationPic();
    console.log("This is cityPic" + cityPic);

    $("#city1").text(cityArr[1].city + ", " + cityArr[1].country);

    $("#city2").text(cityArr[2].city + ", " + cityArr[2].country);

}

$(document).on("click", "#btn0", function () {
    mymap.flyTo([cityArr[0].lat, cityArr[0].lng], 10, {
        animate: true,
        duration: 2 // in seconds
    });
});

$(document).on("click", "#btn1", function () {
    mymap.flyTo([cityArr[1].lat, cityArr[1].lng], 10, {
        animate: true,
        duration: 2 // in seconds
    });
});

$(document).on("click", "#btn2", function () {
    mymap.flyTo([cityArr[2].lat, cityArr[2].lng], 10, {
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

function locationPic() {
    for (let i = 0; i < cityArr.length; i++) {


        console.log("my random city " + cityArr[i]);
        console.log(cityArr[i].city.split(", "));
        var randCitySplit = cityArr[i].country;

        var APIkey = "71bffe063e7e7b08081853a39bb1a26e324af8bafbf84cb28f79e4f75b19cab6";

        var queryURL = "https://api.unsplash.com/search/photos?query=" + randCitySplit + "&client_id=" + APIkey;
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
