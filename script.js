function createElementMovies(img, idElement) {
    let imgElement = document.createElement("img");
    imgElement.src = img;

    let myElement = document.getElementById(idElement);
    myElement.appendChild(imgElement);
}

function bestMovie(linkOfPage) {
    fetch(linkOfPage)
        .then(responses => responses.json())
        .then(datas => {
            createElementMovies(datas.results[0].image_url, "best-movie");
        })
}

function getBestMovies(linkOfPage) {
    fetch(linkOfPage)
        .then(responses => responses.json())
        .then(datas => {
            for (let i = 1; i < 4; i++) {
                createElementMovies(datas.results[i].image_url, "best-rated");
            }

            fetch(datas.next)
                .then(responses => responses.json())
                .then(datas => {
                    for (let i = 0; i < 4; i++) {
                        createElementMovies(datas.results[i].image_url, "best-rated");
                    }
                })
        })
}

function getMoviesFromCategory(linkofCategory, idElement) {
    fetch(linkofCategory)
        .then(responses => responses.json())
        .then(datas => {
            for (let data of datas.results) {
                createElementMovies(data.image_url, idElement);
            }
            fetch(datas.next)
                .then(responses => responses.json())
                .then(datas => {
                    for (let i = 0; i < 2; i++) {
                        createElementMovies(datas.results[i].image_url, idElement);
                    }
                })
        })
}

bestMovie('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score');

getBestMovies('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score');

getMoviesFromCategory('http://localhost:8000/api/v1/titles/?genre=Horror&sort_by=-imdb_score', 'horror');
getMoviesFromCategory('http://localhost:8000/api/v1/titles/?genre=Thriller&sort_by=-imdb_score', 'thriller');
getMoviesFromCategory('http://localhost:8000/api/v1/titles/?genre=Comedy&sort_by=-imdb_score', 'comedy');


