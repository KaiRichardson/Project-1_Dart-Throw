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

}
addCity();
// var map;
// var service;
// var infowindow;

// function initMap(name) {
//   var request = {
//     query: name,
//     fields: ["name", "geometry", "place_id"],
//   };

//   service = new google.maps.places.PlacesService(map);

//   service.findPlaceFromQuery(request, function(results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//       for (var i = 0; i < results.length; i++) {
//         createMarker(results[i]);
//       }

//       map.setCenter(results[0].geometry.location);
//     }
//   });
// }

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
