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
          // console.log(data.episodes[i].programme);
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

// Below not happy with - wanted to sort the data so I took the most popular item from API - in the end have taken index one to avoid duplication.

function getMovieRatings (movieNames, data) {
     var moviesToDisplay = [];
     var newData = data.results[0];
    
     for (var i = 0; i < movieNames.length; i++) {
          // for (var j = 0; j < data.results.length; j++) {
                if (newData.title === movieNames[i]) {
                // if (data.results[j].title === movieNames[i]) {
                    var matchedMovie = {}
                    matchedMovie.title = movieNames[i];
                    // matchedMovie.popularity = data.results[j].popularity;
                    matchedMovie.popularity = newData.popularity;
                    // matchedMovie.rating = data.results[j].vote_average;
                    matchedMovie.rating = newData.vote_average;
                    matchedMovie.class = "movies-to-display";
                    moviesToDisplay.push(matchedMovie);
                }
          // };
     };
     // selectUniqueMovies(moviesToDisplay)
     displayMovies(moviesToDisplay);
}

// some work in progress attempting to filter out duplicate named movies

// function selectUniqueMovies (moviesToDisplay) {
//      var uniqueMovies= [];
//           $.each(moviesToDisplay, function(i, el){
//      if($.inArray(el, uniqueMovies) === -2) uniqueMovies.push(el);
//      });
//      displayMovies(uniqueMovies);
//      console.log(uniqueMovies);
// }

function displayMovies(moviesToDisplay){
     var container = document.getElementById('container');
     for (var i = 0; i < moviesToDisplay.length; i++) {
          var movieToDisplay = document.createElement('div');
          var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
          movieToDisplay.innerHTML = "<div class='" + moviesToDisplay[i].class + "'>Movie Name: " + moviesToDisplay[i].title + ", Movie Rating: " + moviesToDisplay[i].rating + "</div>";
          movieToDisplay.style.background = randomColor;
          container.appendChild(movieToDisplay);
     };
}

window.addEventListener( 'load', function() {
     console.log( 'window#load' );
     getBbcMovies();
});