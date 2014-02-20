function getBbcMovies () {
     $.ajax({
          type: "GET",
          dataType: "json",
          url: 'http://www.bbc.co.uk/tv/programmes/formats/films/player/episodes.json',
          success: function(data){
               console.log("Data retrieved from BBC");
               generateQuery(data);
          },
          error: function (error) {
               console.log("data failed to retrieve from BBC");
          }
     });
}

function generateQuery(data) {
     var movieNames = [];
     for (var i = 0; i < data.episodes.length; i++) {
          movieNames.push(data.episodes[i].programme.title);
     };
     getMovieData(movieNames);   
}

function getMovieData (movieNames) {
     for (var i = 0; i < movieNames.length; i++) {
          var singleMovie = movieNames[i];
          $.ajax({
               type: "GET",
               dataType: "json",
               url: "https://api.themoviedb.org/3/search/movie?api_key=4348efe237b66507ed3b66922f496d7a&query=" + singleMovie,
               success: function(data){
                    console.log("Data retrieved from themoviedb");
                    getMovieRatings(movieNames, data);
               },
               error: function (error) {
                    console.log("data failed to retrieve from themoviedb");
               }
          }); 
     };
}

function getMovieRatings (movieNames, data) {
     var movieRatings = [];
     for (var i = 0; i < data.results.length; i++) {
          for (var j = 0; j < movieNames.length; j++) {
                if (data.results[i].title === movieNames[j]) {
                    var matchedMovie = {}
                    matchedMovie.title = movieNames[j];
                    matchedMovie.rating = data.results[i].vote_average;
                    matchedMovie.class = "movies-to-display";
                    movieRatings.push(matchedMovie);
                }
          };
     };
     displayMovies(movieRatings);
}

function displayMovies(movieRatings){
     var container = document.getElementById('container');
     for (var i = 0; i < movieRatings.length; i++) {
          var movieToDisplay = document.createElement('div');
          var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
          movieToDisplay.innerHTML = "<div class='" + movieRatings[i].class + "'>Movie Name: " + movieRatings[i].title + ", Movie Rating: " + movieRatings[i].rating + "</div>";
          movieToDisplay.style.background = randomColor;
          container.appendChild(movieToDisplay);
     };
}

window.addEventListener( 'load', function() {
     console.log( 'window#load' );
     getBbcMovies();
});