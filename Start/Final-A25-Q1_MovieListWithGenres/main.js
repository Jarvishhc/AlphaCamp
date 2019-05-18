// ========== Declaire variables ==========
const BASE_URL = "https://movie-list.alphacamp.io/"
const INDEX_URL = BASE_URL + "api/v1/movies/"
const IMG_URL = BASE_URL + "posters/"
const movieData = []
const movieGenres = document.querySelector('[data-display-movie-genres]')
const movieList = document.querySelector('[data-display-movie-list]')
const GENRE_LENTH = 19
const genreList = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

// ========== Functions ==========
// Provide a value in an object and return the corresponding key
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

// Provide a genre and dispaly movies that contains the genre
function displayMovieList(genre) {
  let movieListHtml = ''

  for (let i = 0; i < movieData.length; i++) {
    let matched = movieData[i].genres.some(item => item === Number(genre))

    if (matched) {
      movieListHtml += `
        <div class="col-md-3">
          <div class="card">
            <img src="${IMG_URL + movieData[i].image}" class="card-img-top" alt="Movie Image">
            <div class="card-body">
              <h5 class="card-title">${movieData[i].title}</h5>
    `
      movieData[i].genres.forEach(item => {
        movieListHtml += `
              <span class="badge badge-light text-muted font-weight-border d-inline">${genreList[item]}</span>
        `
      })

      movieListHtml += `
            </div>
          </div>
        </div>
             
      `
    }
  }
  movieList.innerHTML = movieListHtml
}

// ========== Code Execution Start Point ==========
axios
  .get(INDEX_URL)
  .then(response => {
    movieData.push(...response.data.results)
  }).catch(error => console.log(error))

// Display all movie genres
let genresHtml = ''
for (let i = 1; i <= GENRE_LENTH; i++) {
  genresHtml += `
    <button type="button" class="btn genres-border rounded-0 shadow-none" data-genres>${genreList[i]}</button>
  `
}
movieGenres.innerHTML = genresHtml

// ========== Event Listner ==========
// Listen to movie genres. Check which genre is selected
movieGenres.addEventListener('click', event => {
  if (event.target.matches('[data-genres]')) {
    let genreKey = getKeyByValue(genreList, event.target.textContent)

    displayMovieList(genreKey)
  }
})

