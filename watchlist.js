$(document).ready(function () {
  //console.log('are you ready to binge watch some movies?')
  const watchlistJSON = localStorage.getItem("watchlist");
  const watchlist = JSON.parse(watchlistJSON);
  //console.log(watchlist)
  function renderMovies(movieArray) {
    let movieHTML = watchlist.map((currentMovie) => {
      //console.log('currentMovie' + currentMovie)
      return `<div class="movie">
      <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${currentMovie.Poster}" alt="${currentMovie.Title}">
          <div class="card-body">
              <h5 class="card-title">${currentMovie.Title}</h5>
              <p class="card-text">${currentMovie.Year}</p>
              <button class="btn btn-primary watchlist-remove-btn" onclick="removeFromWatchlist('${currentMovie.imdbID}')" type= "button">Remove</button>
              <a class = "btn btn-primary" href = "https://www.imdb.com/title/${currentMovie.imdbID}">IMDB</a>
          </div>
      </div>
  </div>`;
    });
    //console.log(movieHTMLs)
    return movieHTML.join("");
  }
  $(".movies-container").html(renderMovies(watchlist));
  console.log(watchlist);
});

// use .filter to create a removeFromWatchlist
