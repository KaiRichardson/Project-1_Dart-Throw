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

var startCity = "";
var startTrip = "";
var endTrip = "";
var startLat = 0;
var startLng = 0;

var faqEmail = "";
var faqQuestion = "";

var randName = "";
var randCode = "";
var randDetails = "";
var cityPic = "";
var mymap = L.map('mapid').setView([39.597811, 3.078442], 1);

var fromIata = "";
var toIata = "";
var leaveDate = 0;
var backDate = 0;
var returning = 1;

var wikiName = "";

var fare = 0;
var dist = 0;

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

// for first input
database.ref().on("value", function (snapshot) {

  if (snapshot.child("startCity").exists() && snapshot.child("startTrip").exists() && snapshot.child("endTrip").exists()) {
    startCity = snapshot.val().startCity;
    startTrip = snapshot.val().startTrip;
    endTrip = snapshot.val().endTrip;
  }

  console.log("this is startCity " + startCity);
  console.log("this is startTrip " + startTrip);
  console.log("this is endTrip " + endTrip);

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

  // leaveDate = startTrip.replace(/(..).(..).(....)/, "$3$1$2");
  // backDate = endTrip.replace(/(..).(..).(....)/, "$3$1$2");
  // leaveDate = dateSwitch(startTrip);
  // backDate = dateSwitch(endTrip);

  console.log(leaveDate);
  console.log(backDate);

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// for second input
database.ref().on("value", function (snapshot) {

  if (snapshot.child("faqEmail").exists() && snapshot.child("faqQuestion").exists()) {
    faqEmail = snapshot.val().faqEmail;
    faqQuestion = snapshot.val().faqQuestion;
  }

  console.log("this is faqEmail " + faqEmail);
  console.log("this is faqQuestion " + faqQuestion);

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

function getDistance(destLat, destLng) {
  // return distance in meters
  var lon1 = toRadian(startLng);
  var lat1 = toRadian(startLat);
  var lon2 = toRadian(destLng);
  var lat2 = toRadian(destLat);

  var deltaLat = lat2 - lat1;
  var deltaLon = lon2 - lon1;

  var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
  var c = 2 * Math.asin(Math.sqrt(a));
  var EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS * 1000;
}
function toRadian(degree) {
  return degree*Math.PI/180;
}


window.onscroll = function () { scrollFunc() };

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function scrollFunc() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

$(".scrollBtn").on("click", function () {
  $('html,body').animate({
    scrollTop: $($(this).attr('href')).offset().top
  },
    'slow');
});

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].city === nameKey) {
      return myArray[i];
    }
  }
}

function randCity() {
  for (let i = 0; i < cityArr.length; i++) {
    var cityNum = randomInt(0, 50);
    // var result = search(cityNames[cityNum].city, iataCodes);
    cityArr[i].city = cityNames[cityNum].city;
    cityArr[i].country = cityNames[cityNum].country;
    cityArr[i].lat = cityNames[cityNum].lat;
    cityArr[i].lng = cityNames[cityNum].lng;
    // cityArr[i].iata = result.iata;
    cityArr[i].pop = cityNames[cityNum].population;

    for (var j = 0; j < iataCodes.length; j++) {
      if (iataCodes[j].city === cityArr[i].city) {
        cityArr[i].iata = iataCodes[j].iata;
      }
    }


    console.log(cityArr[i].iata);
    console.log(cityArr[i].country);
  }
  cityInfo()

};

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



$(document).on("click", "#btn0Loca", function () {
  mymap.flyTo([cityArr[0].lat, cityArr[0].lng], 10, {
    animate: true,
    duration: 5 // in seconds
  });
  dist = getDistance(cityArr[0].lat, cityArr[0].lng);
  console.log(dist);
  // Fare = 50 + (dist * 0.11)
  $("#avg_dist").text(Math.round(dist * 0.000621371));
  $("#avg_ttime").text(Math.round(dist / 804672));
  $("#avg_price").text(50 + (Math.round(dist * 0.000621371) * 0.11));
});

$(document).on("click", "#btn1Loca", function () {
  mymap.flyTo([cityArr[1].lat, cityArr[1].lng], 10, {
    animate: true,
    duration: 5 // in seconds
  });
  $("#to_city").text(cityArr[1].city);
  dist = getDistance(cityArr[1].lat, cityArr[1].lng)
  console.log(dist);
  // Fare = 50 + (dist * 0.11)
  $("#avg_dist").text(Math.round(dist * 0.000621371));
  $("#avg_ttime").text(Math.round(dist / 804672));
  $("#avg_price").text(50 + (Math.round(dist * 0.000621371) * 0.11));
});

$(document).on("click", "#btn2Loca", function () {
  mymap.flyTo([cityArr[2].lat, cityArr[2].lng], 10, {
    animate: true,
    duration: 5 // in seconds
  });
  $("#to_city").text(cityArr[2].city);
  dist = getDistance(cityArr[2].lat, cityArr[2].lng)
  console.log(dist);
  // Fare = 50 + (dist * 0.11)
  $("#avg_dist").text(Math.round(dist * 0.000621371));
  $("#avg_ttime").text(Math.round(dist / 804672));
  $("#avg_price").text(50 + (Math.round(dist * 0.000621371) * 0.11));
});

$(document).on("click", "#btn0", function () {
  toIata = cityArr[0].iata;
  locationPic(cityArr[0].country);
$("#population").text(cityArr[0].pop)
  wikiName = cityArr[0].city;
});

$(document).on("click", "#btn1", function () {
  toIata = cityArr[1].iata;
  locationPic(cityArr[1].country);
  $("#population").text(cityArr[1].pop)
  wikiName = cityArr[1].city;

});

$(document).on("click", "#btn2", function () {
  toIata = cityArr[2].iata;
  locationPic(cityArr[2].country);
  $("#population").text(cityArr[2].pop)
  wikiName = cityArr[2].city;

});

// function dateSwitch(input) {
//   var output = input.replace(/(..).(..).(....)/, "$3$1$2");
//   return output;
// }


$(document).on("click", "#flight-submit-button", function () {

  if ($('#checkBox').is(":checked"))
{
  returning = 0;
}

  if (returning = 0) {
    window.open("https://www.skyscanner.com/transport/flights/" + fromIata + "/" + toIata + "/" + leaveDate + "/?adults=1&children=0&adultsv2=1&childrenv2=&infants=0&cabinclass=economy" + "&rtn=" + returning + "&preferdirects=false&outboundaltsenabled=true&inboundaltsenabled=true&ref=home#results");

  } else {
    window.open("https://www.skyscanner.com/transport/flights/" + fromIata + "/" + toIata + "/" + leaveDate + "/" + backDate + "/?adults=1&children=0&adultsv2=1&childrenv2=&infants=0&cabinclass=economy" + "&rtn=" + returning + "&preferdirects=false&outboundaltsenabled=true&inboundaltsenabled=true&ref=home#results");
  }
});

$(document).on("click", "#wiki_btn", function () {

    window.open("https://en.wikipedia.org/wiki/" + wikiName);
});


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1Ijoia2FpcmljaGFyZHNvbiIsImEiOiJjanVmdGZwY2EwZTA5NDRucThtbjkwdXNoIn0.5SVT37RtNOBEEcyU2umFAQ'
}).addTo(mymap);

function locationPic(countryIn) {
  var APIkey = "71bffe063e7e7b08081853a39bb1a26e324af8bafbf84cb28f79e4f75b19cab6";

  var queryURL = "https://api.unsplash.com/search/photos?query=" + countryIn + "&client_id=" + APIkey;

  $.ajax({
    url: queryURL,
    method: "GET"
  })

    .then(function (response) {
      $("#detailPic0").attr("src", response.results[0].urls.raw);
      $("#detailPic1").attr("src", response.results[1].urls.raw);
      $("#detailPic2").attr("src", response.results[2].urls.raw);
    });
  // }
};

$(document).on("click", "#search_btn", randCity);

randCity();
