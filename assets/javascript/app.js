var city0 = 0;
var city1 = 0;
var city2 = 0;
var randName = "";
var randCode = "";
var randDetails = "";

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randCity() {
    var cityNum = randomInt(0, 3592);
    randName = cityNames[cityNum].city;
    randCode = cityNames[cityNum].name;
    randDetails = initMap(randName);


    console.log(cityNames[cityNum].city);
    console.log(cityNames[cityNum].name);
    console.log(randDetails);
};

function addCity() {
    randCity();
    $("#city0").text(randName);
    $("#text0").text(randDetails);


    randCity();
    $("#city1").text(randName);

    randCity();
    $("#city2").text(randName);

}

var map;
var service;
var infowindow;

function initMap(name) {
  var request = {
    query: name,
    fields: ["name", "geometry", "place_id"],
  };

  service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
}

var APIkey = "71bffe063e7e7b08081853a39bb1a26e324af8bafbf84cb28f79e4f75b19cab6";

var queryURL = "https://api.unsplash.com/photos/?client_id=" + APIkey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
        console.log(queryURL);
        console.log(response);


        $("#deal_pic0").attr(src, response.query.per_page);


    });


addCity();