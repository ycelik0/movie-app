console.log('main2.js loaded');

const keyAPI = 'api_key=4de8d273ef3b27a0c3dbf394596efab0';
const baseURL = 'https://api.themoviedb.org/3'
const popularKey = `${baseURL}/discover/movie?sort_by=popularity.desc&${keyAPI}`
const imageURL = 'https://image.tmdb.org/t/p/w300/';

document.addEventListener('DOMContentLoaded', () => {
  getAPI(popularKey);
});

function getAPI(url) {
  fetch(`${url}`)
    .then(res => res.json())
    .then(data => {
      createMovies(data.results)
    })
}

const content = document.querySelector('.content');

function createMovies(data) {
  data.forEach(movie => {
    console.log(movie);
    // Create Div
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie-item', 'text-white');
    // Create Image
    const imageEl = document.createElement('img');
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
  });
}