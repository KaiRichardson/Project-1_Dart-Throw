

function googleLocation() {

    

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