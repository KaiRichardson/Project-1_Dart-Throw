

var APIkey = "71bffe063e7e7b08081853a39bb1a26e324af8bafbf84cb28f79e4f75b19cab6";

var queryURL = "https://api.unsplash.com/photos/?client_id=" + APIkey;

$.ajax({
    url: queryURL,
    method: "GET"
})

.then(function(response) {
    console.log(queryURL);
    console.log(response);

    
    $("#deal_pic0").attr(src, response.query.per_page);
    
    
});