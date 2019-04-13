var city1 = 0;
var city2 = 0;
var city3 = 0;

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function googleLocation() {

    city1 = randomInt();

    var googleAPIKey = "AIzaSyDK9NSTXldOANLayzALzg1Aufdw4Yn1GNE";
    var gif = currentBtn;

    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=1VROgf6YVudOX8A67lhS4EheWllnytNT&offset=" + offset;
    var queryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + googleAPIKey;
    var queryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + googleAPIKey;

    "https://maps.googleapis.com/maps/api/place/findplacefromtext/output?parameters"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        console.log(response);



    });
};

function locationPic(){

    
    var APIkey = "71bffe063e7e7b08081853a39bb1a26e324af8bafbf84cb28f79e4f75b19cab6";
    
    var queryURL = "https://api.unsplash.com/search/photos/?client_id=" + APIkey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then(function(response) {
        console.log(queryURL);
        console.log(response);
        
        
        $("#deal_pic0").attr(src, response.unsplash.search.photos("explore", 1, 1));
        $("#deal_pic1").attr(src, response.unsplash.search.photos("explore", 1, 1));
        $("#deal_pic2").attr(src, response.unsplash.search.photos("explore", 1, 1));
        
    });
};