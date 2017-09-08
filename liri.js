
var keys = require("./keys.js");

var Twitter = require('twitter');

var client = new Twitter(keys.twitter);

var Spotify = require('node-spotify-api');
// var Spotify = require('spotify');
var spotify = new Spotify(keys.Spotify);

var request = require('request');

var fs = require('fs');

var userInput = "";

var nodeArgv = process.argv;
var action = process.argv[2];
console.log(action);

for (var i = 3; i < nodeArgv.length; i++){
    if(i > 3 && i < nodeArgv.length){
        userInput = userInput + "+" + nodeArgv[i];
    } else {
        userInput = userInput + nodeArgv[i];
    }
}

switch(action) {
    case "my-tweets": 
    case "t":
    fireTwitter();
    break;
    case "spotify-this-song":
    case "s":
    fireSpotify("Gel");
    break;

    default: console.log("Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says")
}

function fireTwitter() {

    var params = {screen_name: 'XYN HA'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        // if (!error) {
        //     console.log(tweets);
        // }
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            if (i == 19){
                break;
            }
        }
    });

}

function fireSpotify(query) {

    
    
    // var spotify = new Spotify({
    //     id: "29fb2fd2029143759230ba09d92d6e7a",
    //     secret: "4dc803c1e1474401a959c4555a4328ed"
    // });
    
    
    spotify.search({type: 'track', query: userInput}, function(err, data) {
        if (!err) {
            // return console.log('Error occurred: ' + err);
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                console.log("Artist: " + songData.artists[0].name);
                console.log("Song: " + songData.name);
                console.log("Preview URL: " + songData.preview_url);
                console.log("Album: " + songData.album.name);
                console.log("___________________________");
                
                //adds text to log.txt
                fs.appendFile('log.txt', songData.artists[0].name);
                fs.appendFile('log.txt', songData.name);
                fs.appendFile('log.txt', songData.preview_url);
                fs.appendFile('log.txt', songData.album.name);
                

            }
    
        // console.log(data); 
        } else {
            console.log('Oopsie');
        }
    });

}


    //request API: 40e9cece
    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.