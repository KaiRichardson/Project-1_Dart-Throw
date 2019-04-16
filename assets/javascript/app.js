var cityArr = [{
    city: "",
    country: "",
    lat: 0,
    lng: 0,
    info: "",
    thumb: ""
},
{
    city: "",
    country: "",
    lat: 0,
    lng: 0,
    info: "",
    thumb: ""
},
{
    city: "",
    country: "",
    lat: 0,
    lng: 0,
    info: "",
    thumb: ""
}];

var randName = "";
var randCode = "";
var randDetails = "";
var mymap = L.map('mapid').setView([39.597811, 3.078442], 1);
var cityPic = "";

window.onscroll = function () { myFunction() };

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

$(".scrollBtn").click(function() {
    $('html,body').animate({
        scrollTop: $($(this).attr('href')).offset().top},
        'slow');
});

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cityInfo() {

    for (let i = 0; i < cityArr.length; i++) {

        // var wikiQueryURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=" + chars + "&explaintext=&titles=" + cName + "&format=json";
        var wikiQueryURL = "https://en.wikipedia.org/api/rest_v1/page/summary/" + cityArr[i].city;

        $.ajax({
            url: wikiQueryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            cityArr[i].info = response.extract
            cityArr[i].thumb = response.thumbnail.source;

            addCity();

        });
    }
}

randCity()

function randCity() {

    for (let i = 0; i < cityArr.length; i++) {
        var cityNum = randomInt(0, 500);
        cityArr[i].city = cityNames[cityNum].city;
        cityArr[i].country = cityNames[cityNum].country;
        cityArr[i].lat = cityNames[cityNum].lat;
        cityArr[i].lng = cityNames[cityNum].lng;
    }
    cityInfo()

};

function addCity() {
    // locationPic();
    console.log(cityArr[0].info);

    $("#city0").text(cityArr[0].city + ", " + cityArr[0].country);
    $("#text0").text(cityArr[0].info.substring(0, 150) + "...");
    $("#deal-pic0").attr("src", cityArr[0].thumb);

    $("#city1").text(cityArr[1].city + ", " + cityArr[1].country);
    $("#text1").text(cityArr[1].info.substring(0, 150) + "...");
    $("#deal-pic1").attr("src", cityArr[1].thumb);

    $("#city2").text(cityArr[2].city + ", " + cityArr[2].country);
    $("#text2").text(cityArr[2].info.substring(0, 150) + "...");
    $("#deal-pic2").attr("src", cityArr[2].thumb);

}

$(document).on("click", "#btn0Loca", function () {
    mymap.flyTo([cityArr[0].lat, cityArr[0].lng], 10, {
        animate: true,
        duration: 5 // in seconds
    });
});

$(document).on("click", "#btn1Loca", function () {
    mymap.flyTo([cityArr[1].lat, cityArr[1].lng], 10, {
        animate: true,
        duration: 5 // in seconds
    });
});

$(document).on("click", "#btn2Loca", function () {
    mymap.flyTo([cityArr[2].lat, cityArr[2].lng], 10, {
        animate: true,
        duration: 5 // in seconds
    });
});

$(document).on("click", "#btn0", function () {
    gotToSkyscanner(cityArr[0].lat, cityArr[0].lng);
});

$(document).on("click", "#btn1", function () {
    gotToSkyscanner(cityArr[1].lat, cityArr[1].lng);
});

$(document).on("click", "#btn2", function () {
    gotToSkyscanner(cityArr[2].lat, cityArr[2].lng);

});

function gotToSkyscanner(lat, lng) {

    var wikiQueryURL = "https://iatacodes.org/api/v6/nearby?api_key=8c7d3c54-01d7-4d9e-86f9-30c23824d802&lat=" + lat + "lng=" + lng + "&distance=1000";

    $.ajax({
        url: wikiQueryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);


        var destination;

        window.open("https://www.skyscanner.com/transport/flights/" + + "/" + + "/" + + "/" + + "/" + + "/");

    });

    // https://www.skyscanner.com/transport/flights
    // /sea(starting point IATA code)
    // /anc(destination IATA code)
    // /190814(leaving date YY/MM/DD)
    // /190822(return date YY/MM/DD)
    // /?adults=1
    // &children=0
    // &adultsv2=1
    // &childrenv2=
    // &infants=0
    // &cabinclass=economy
    // &rtn=1 (boolian, 0=no return)
    // &preferdirects=false
    // &outboundaltsenabled=false
    // &inboundaltsenabled=false
    // &ref=home#results
}


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FpcmljaGFyZHNvbiIsImEiOiJjanVmdGZwY2EwZTA5NDRucThtbjkwdXNoIn0.5SVT37RtNOBEEcyU2umFAQ'
}).addTo(mymap);

function locationPic() {
    for (let i = 0; i < cityArr.length; i++) {


        var randCitySplit = cityArr[i].city;

        var APIkey = "71bffe063e7e7b08081853a39bb1a26e324af8bafbf84cb28f79e4f75b19cab6";

        var queryURL = "https://api.unsplash.com/search/photos?query=" + randCitySplit + "&client_id=" + APIkey;
        console.log("my query is:" + queryURL);


        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                // var results = response.data;

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

function fbFunc() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBcNpHMMSe4lQub_7xxEFkyepK1H8ObAdE",
        authDomain: "dart-throw.firebaseapp.com",
        databaseURL: "https://dart-throw.firebaseio.com",
        projectId: "dart-throw",
        storageBucket: "dart-throw.appspot.com",
        messagingSenderId: "554192496798"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
};
