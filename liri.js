

var Twitter = require('twitter');

var keys = require("./keys.js");

var client = new Twitter(keys.twitter);

var action = process.argv[2];
console.log(action);

switch(action) {
    case "my-tweets": 
    case "t":
    fireTwitter();
    break;
    case "spotify-this-song":
    case "s":
    fireSpotify();
    break;

    default: console.log("please enter spotify, my-tweets etc")
}

function fireTwitter() {

    var params = {screen_name: 'XYN HA'};
    client.get('statuses/user_timeline', params, function(error, tweet, response) {
    if (!error) {
    console.log(tweet);
    }
    });

}

function fireSpotify() {

    var Spotify = require('node-spotify-api');
    
    var spotify = new Spotify({
        id: "29fb2fd2029143759230ba09d92d6e7a",
        secret: "4dc803c1e1474401a959c4555a4328ed"
    });
    
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
    }
    
    console.log(data); 
    });

}