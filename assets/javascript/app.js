// Initialize Firebase
var config = {
  apiKey: "AIzaSyBrbkBG7yWT3b_SyomTkIvRR42M1JMo-Rk",
  authDomain: "dart-throw-75c09.firebaseapp.com",
  databaseURL: "https://dart-throw-75c09.firebaseio.com",
  projectId: "dart-throw-75c09",
  storageBucket: "dart-throw-75c09.appspot.com",
  messagingSenderId: "559350308558"
};
firebase.initializeApp(config);

var database = firebase.database();

//array of random cities
var cityArr = [{
  city: "",
  country: "",
  lat: 0,
  lng: 0,
  info: "",
  thumb: "",
  iata: "",
  pop: 0
},
{
  city: "",
  country: "",
  lat: 0,
  lng: 0,
  info: "",
  thumb: "",
  iata: "",
  pop: 0
},
{
  city: "",
  country: "",
  lat: 0,
  lng: 0,
  info: "",
  thumb: "",
  iata: "",
  pop: 0
}];

//first user input vars
var startCity = "";
var startTrip = "";
var endTrip = "";
var startLat = 0;
var startLng = 0;
var returning = 1;

// FAQ user input vars
var faqEmail = "";
var faqQuestion = "";

//random destinations vars
var randName = "";
var randCode = "";
var randDetails = "";
var cityPic = "";
var mymap = L.map('mapid').setView([39.597811, 3.078442], 1);

//from database
var fromIata = "";
var toIata = "";
var leaveDate = 0;
var backDate = 0;

//for wiki city storage
var wikiName = "";

// for distance calc
var dist = 0;

// create header start after scroll
var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

//implementing slow window scroll
window.onscroll = function () { scrollFunc() };

//funct for scroll
function scrollFunc() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

//animate scroll when a button in clicked
$(".scrollBtn").on("click", function () {
  $('html,body').animate({
    scrollTop: $($(this).attr('href')).offset().top
  },
    'slow');
});

//ON-CLICK FOR USER'S TRIP DETAILS//
$("#search_btn").on("click", function () {

  var userFrom = $("#origin_input").val();
  var userLeave = $("#leave_input").val();
  var userBack = $("#return_input").val();

  var userFromUpper = userFrom.charAt(0).toUpperCase() + userFrom.slice(1);

  database.ref().set({
    startCity: userFromUpper,
    startTrip: userLeave,
    endTrip: userBack,
  });
})

//ON-CLICK FOR FAQ TO FIREBASE//
$("#faq-button").on("click", function () {

  var userEmail = $("#faq-email").val();
  var userQuestion = $("#faq-question").val();

  database.ref().set({
    faqEmail: userEmail,
    faqQuestion: userQuestion,
  });
});

// for first user input
database.ref().on("value", function (snapshot) {

  if (snapshot.child("startCity").exists() && snapshot.child("startTrip").exists() && snapshot.child("endTrip").exists()) {
    startCity = snapshot.val().startCity;
    startTrip = snapshot.val().startTrip;
    endTrip = snapshot.val().endTrip;
  }

  $("#from_city").text(startCity);

  for (var j = 0; j < iataCodes.length; j++) {
    if (iataCodes[j].city === startCity) {
      fromIata = iataCodes[j].iata;
    }
  }

  for (var i = 0; i < cityNames.length; i++) {
    if (cityNames[i].city === startCity) {
      startLat = cityNames[i].lat;
      startLng = cityNames[i].lng;
    }
  }

  leaveDate = startTrip.replace(/-/g, "");
  backDate = endTrip.replace(/-/g, "");

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// for FAQ user input
database.ref().on("value", function (snapshot) {

  if (snapshot.child("faqEmail").exists() && snapshot.child("faqQuestion").exists()) {
    faqEmail = snapshot.val().faqEmail;
    faqQuestion = snapshot.val().faqQuestion;
  }

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

//distance calc from start to destination
function getDistance(destLat, destLng) {
  var lon1 = toRadian(startLng);
  var lat1 = toRadian(startLat);
  var lon2 = toRadian(destLng);
  var lat2 = toRadian(destLat);

  var deltaLat = lat2 - lat1;
  var deltaLon = lon2 - lon1;

  var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
  var c = 2 * Math.asin(Math.sqrt(a));
  var EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS * 1000;
}
function toRadian(degree) {
  return degree * Math.PI / 180;
}

//find random intager
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//ajax call to wiki api for gen info
function cityInfo() {
  for (let i = 0; i < cityArr.length; i++) {

    var wikiQueryURL = "https://en.wikipedia.org/api/rest_v1/page/summary/" + cityArr[i].city;

    $.ajax({
      url: wikiQueryURL,
      method: "GET"
    }).then(function (response) {

      cityArr[i].info = response.extract;
      cityArr[i].thumb = response.thumbnail.source;

      addCity();

    });
  };
};

//find city from database and populate city obj with info
function randCity() {
  for (let i = 0; i < cityArr.length; i++) {
    var cityNum = randomInt(0, 50);
    cityArr[i].city = cityNames[cityNum].city;
    cityArr[i].country = cityNames[cityNum].country;
    cityArr[i].lat = cityNames[cityNum].lat;
    cityArr[i].lng = cityNames[cityNum].lng;
    cityArr[i].pop = cityNames[cityNum].population;

    for (var j = 0; j < iataCodes.length; j++) {
      if (iataCodes[j].city === cityArr[i].city) {
        cityArr[i].iata = iataCodes[j].iata;
      }
    }
  }
  cityInfo()
};

//add city to the dom
function addCity() {
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

//--------random city location buttons--------
//on click of location btn 0
$(document).on("click", "#btn0Loca", function () {
  mymap.flyTo([cityArr[0].lat, cityArr[0].lng], 10, {
    animate: true,
    duration: 5 // in seconds
  });
  dist = getDistance(cityArr[0].lat, cityArr[0].lng);
  console.log(dist);
  $("#avg_dist").text(Math.round(dist * 0.000621371));
  $("#avg_ttime").text(Math.round(dist / 804672));
  $("#avg_price").text(50 + (Math.round(dist * 0.000621371) * 0.11));
});

//on click of location btn 1
$(document).on("click", "#btn1Loca", function () {
  mymap.flyTo([cityArr[1].lat, cityArr[1].lng], 10, {
    animate: true,
    duration: 5 // in seconds
  });
  $("#to_city").text(cityArr[1].city);
  dist = getDistance(cityArr[1].lat, cityArr[1].lng)
  console.log(dist);
  $("#avg_dist").text(Math.round(dist * 0.000621371));
  $("#avg_ttime").text(Math.round(dist / 804672));
  $("#avg_price").text(50 + (Math.round(dist * 0.000621371) * 0.11));
});

//on click of location btn 2
$(document).on("click", "#btn2Loca", function () {
  mymap.flyTo([cityArr[2].lat, cityArr[2].lng], 10, {
    animate: true,
    duration: 5 // in seconds
  });
  $("#to_city").text(cityArr[2].city);
  dist = getDistance(cityArr[2].lat, cityArr[2].lng)
  console.log(dist);
  $("#avg_dist").text(Math.round(dist * 0.000621371));
  $("#avg_ttime").text(Math.round(dist / 804672));
  $("#avg_price").text(50 + (Math.round(dist * 0.000621371) * 0.11));
});

//--------random city detail buttons--------
//on click of detail btn 0
$(document).on("click", "#btn0", function () {
  toIata = cityArr[0].iata;
  locationPic(cityArr[0].country);
  $("#population").text(cityArr[0].pop)
  wikiName = cityArr[0].city;
});

//on click of detail btn 1
$(document).on("click", "#btn1", function () {
  toIata = cityArr[1].iata;
  locationPic(cityArr[1].country);
  $("#population").text(cityArr[1].pop)
  wikiName = cityArr[1].city;
});

//on click of detail btn 2
$(document).on("click", "#btn2", function () {
  toIata = cityArr[2].iata;
  locationPic(cityArr[2].country);
  $("#population").text(cityArr[2].pop)
  wikiName = cityArr[2].city;
});

//on click of Take Me There btn goto skyscanner site for price
$(document).on("click", "#flight-submit-button", function () {
  if ($('#checkBox').is(":checked")) {
    returning = 0;
  }
  if (returning = 0) {
    window.open("https://www.skyscanner.com/transport/flights/" + fromIata + "/" + toIata + "/" + leaveDate + "/?adults=1&children=0&adultsv2=1&childrenv2=&infants=0&cabinclass=economy" + "&rtn=" + returning + "&preferdirects=false&outboundaltsenabled=true&inboundaltsenabled=true&ref=home#results");

  } else {
    window.open("https://www.skyscanner.com/transport/flights/" + fromIata + "/" + toIata + "/" + leaveDate + "/" + backDate + "/?adults=1&children=0&adultsv2=1&childrenv2=&infants=0&cabinclass=economy" + "&rtn=" + returning + "&preferdirects=false&outboundaltsenabled=true&inboundaltsenabled=true&ref=home#results");
  }
});

// on click of wiki page btn, goto wiki page for city
$(document).on("click", "#wiki_btn", function () {

  window.open("https://en.wikipedia.org/wiki/" + wikiName);
});

//map intagration for location section
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1Ijoia2FpcmljaGFyZHNvbiIsImEiOiJjanVmdGZwY2EwZTA5NDRucThtbjkwdXNoIn0.5SVT37RtNOBEEcyU2umFAQ'
}).addTo(mymap);

// country/city pictures for details section
function locationPic(countryIn) {
  var APIkey = "71bffe063e7e7b08081853a39bb1a26e324af8bafbf84cb28f79e4f75b19cab6";
  var queryURL = "https://api.unsplash.com/search/photos?query=" + countryIn + "&client_id=" + APIkey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
      $("#detailPic0").attr("src", response.results[0].urls.raw);
      $("#detailPic1").attr("src", response.results[1].urls.raw);
      $("#detailPic2").attr("src", response.results[2].urls.raw);
    });
};

//on click of search btn, load 3 random cities
$(document).on("click", "#search_btn", randCity);

//on page load, load 3 plce holder cities 
randCity();
