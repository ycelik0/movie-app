console.log('main2.js loaded');

const input = document.querySelector('.input');

// URL
const keyAPI = 'api_key=4de8d273ef3b27a0c3dbf394596efab0';
const baseURL = 'https://api.themoviedb.org/3'
const popularKey = `${baseURL}/discover/movie?sort_by=popularity.desc&${keyAPI}`
const imageURL = 'https://image.tmdb.org/t/p/w300/';

// Buttons
const content = document.querySelector('.content');
const searchBtn = document.querySelector('.search-btn');

document.addEventListener('DOMContentLoaded', () => {
  getAPI(popularKey);
});

searchBtn.addEventListener('click', searchMovie);
input.addEventListener('keypress', (event) => {
if (event.keyCode === 13) {
    searchMovie();
  }
});

// Search Movie
function searchMovie() {
  const movieItem = document.querySelectorAll('.movie-item');
  movieItem.forEach(movie => {
    movie.remove();
  })
  if (input.value !== '') {
    const searchURL = `${baseURL}/search/movie?${keyAPI}&query=${input.value}`
    input.value = input.value.replace(' ', '+');
    getAPI(searchURL);
  } else {
    getAPI(popularKey);
  }
}

// Fetch data
function getAPI(url) {
  fetch(`${url}`)
    .then(res => res.json())
    .then(data => {
      createMovies(data.results)
    })
}

// Create Cards
function createMovies(data) {
  data.forEach(movie => {
    // Create Div
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie-item', 'text-white');
    // Create Image
    const imageEl = document.createElement('img');
    imageEl.classList.add('movie-image');
    imageEl.src = imageURL + movie.poster_path;
    // Create Info 
    const infoBox = document.createElement('div');
    infoBox.classList.add('movie-info', 'd-flex', 'justify-content-between', 'pt-2');
    infoBox.style.maxWidth = `${imageEl.width}px`;
    // Create Title
    const titleDiv = document.createElement('h5');
    titleDiv.classList.add('movie-title');
    titleDiv.textContent = movie.title;
    // Create Rating
    const RatingDiv = document.createElement('div');
    RatingDiv.classList.add('movie-rating', 'px-3', 'py-1', 'rounded-1', 'align-middle');
    RatingDiv.textContent = movie.vote_average;
    // Append everything
    infoBox.append(titleDiv, RatingDiv);
    movieDiv.append(imageEl, infoBox);
    content.append(movieDiv);
    // Check Movie Rating
    checkRating(movie, RatingDiv)
    createModal(movie)
  });
}

function checkRating(movie, RatingDiv) {
  if (movie.vote_average >= 8) {
    RatingDiv.classList.add('green')
  } else if (movie.vote_average >= 6) {
    RatingDiv.classList.add('orange')
  } else {
    RatingDiv.classList.add('red')
  }
}

document.addEventListener('DOMContentLoaded', createModal())

function createModal(movie) {
  const movieImages = document.querySelectorAll('.movie-image');
  const modal = document.querySelector('.info-modal');
  const closeModalBtn = document.querySelector('.close-modal-btn');
  const modalShadow = document.querySelector('.modal-shadow');

  closeModalBtn.addEventListener('click', closeModal)

  movieImages.forEach(movieImage => {
    movieImage.addEventListener('click', openModal)
  });

  function openModal() {
    modal.classList.add('active')
    modalShadow.classList.add('active')
  }
  
  function closeModal() {
    modal.classList.remove('active')
    modalShadow.classList.remove('active')
  }
}