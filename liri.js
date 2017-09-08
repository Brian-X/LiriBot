
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
    fireSpotify();
    break;
    case "movie-this":
    case "m":
    fireOMDB();
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
                fs.appendFile('log.txt', "_____________________________");

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

// var omdb = require('omdb');

function fireOMDB() {
        
    request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece", function (err, response, body) {
        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!err && response.statusCode === 200) {
            var body = JSON.parse(body);
        

            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            // Then we print out the imdbRating
            console.log("The movie's rating is: " + body.imdbRating);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("___________________________");            

            fs.appendFile('log.txt', body.Title);
            fs.appendFile('log.txt', body.Year);
            fs.appendFile('log.txt', body.imdbRating);
            fs.appendFile('log.txt', body.tomatoRating);
            fs.appendFile('log.txt', body.Country);
            fs.appendFile('log.txt', body.Plot);
            fs.appendFile('log.txt', body.Actors);
            fs.appendFile('log.txt', "_____________________________");

        } else {
            console.log('Oopsie');
        }
    });

};