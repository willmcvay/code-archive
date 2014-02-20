function getBbcMovies () {
     $.ajax({
          type: "GET",
          dataType: "json",
          url: 'http://www.bbc.co.uk/tv/programmes/formats/films/player/episodes.json',
          success: function(data){
               console.log("Data retrieved from BBC");
               generateQuery(data);
               console.log(data);
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
                    console.log(data);
                    return data;
               },
               error: function (error) {
                    console.log("data failed to retrieve from themoviedb");
               }
          }); 
     };

}

window.addEventListener( 'load', function() {
     console.log( 'window#load' );
     getBbcMovies();
});