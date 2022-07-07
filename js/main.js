const content = document.querySelector('.content');
const input = document.querySelector('.input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
  getAPI();
})
input.addEventListener('keypress', (event) => {
  if (event.key == 'Enter') {
    getAPI();
  }
})


function getAPI() {
  const movieItems = document.querySelectorAll('.movie-item');
  if (movieItems) {
    movieItems.forEach(movieItem => {
      movieItem.remove();
    });
  }
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a9f0d1ae89msh3d2d6c7f45d7d81p19d35djsnaaa2b2ac04a5',
      'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
    }
  };
  // Fetch API
  fetch(`https://mdblist.p.rapidapi.com/?s=${input.value}`, options)
	.then(response => response.json())
  // Get Data
	.then(response => {
    // Make movie items using data
    response.search.forEach(responseItem => {
      const movieScore = document.createElement('h4');
      movieScore.textContent = responseItem.score;
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-item', 'text-center');
      const movieTitle = document.createElement('h6');
      movieTitle.textContent = responseItem.title;
      const yearDiv = document.createElement('p');
      yearDiv.classList.add('item-year');
      yearDiv.textContent = `(${responseItem.year})`;
      movieDiv.append(movieScore, movieTitle, yearDiv)
      content.append(movieDiv)
    });
  })
	.catch(err => console.error(err));
}