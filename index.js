$(document).ready(() => {
  //console.log('jQuery is ready to rumble')

  function renderMovies(movieArray) {
    let movieHTML = movieArray.map((currentMovie) => {
      // console.log(currentMovie)
      // console.log(currentMovie.Title)
      return `<div class="movie">
                <div class="card" style="width: 18rem;">
                  <img class="card-img-top" src="${currentMovie.Poster}" alt="${currentMovie.Title}">
                  <div class="card-body">
                    <h5 class="card-title">${currentMovie.Title}</h5>
                    <p class="card-text">${currentMovie.Year}</p>
                    <a href="#" class="btn btn-primary" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add Movie</a>
                  </div>
                </div>
              </div>`;
    });
    //console.log(movieHTML);
    return movieHTML.join("");
  }

  $("#search-form").submit((e) => {
    e.preventDefault();

    let searchString = $(".search-bar").val();
    //console.log(searchString)
    let urlEncodedSearchString = encodeURIComponent(searchString);

    fetch(
      `https://www.omdbapi.com/?apikey=8534d2a7&s=${urlEncodedSearchString}`
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        //console.log(response.Search)
        $(".movies-container").html(renderMovies(response.Search));
      });
  });
});

function saveToWatchlist(imdbID) {
  fetch(`https://www.omdbapi.com/?apikey=8534d2a7&i=${imdbID}`)
    .then((response) => response.json())
    .then((response) => {
      let watchlistJSON = localStorage.getItem("watchlist");
      let watchlist = JSON.parse(watchlistJSON);
      if (watchlist === null) {
        watchlist = [];
      }
      watchlist.push(response);
      watchlistJSON = JSON.stringify(watchlist);
      localStorage.setItem("watchlist", watchlistJSON);
    });
}
