btn = document.querySelector(".btn-more");
mytest = document.querySelector(".modal")
overlay = document.querySelector(".overlay");
closeButton = document.querySelector(".btn-close")

overlay.addEventListener("click", function () {
    mytest.style.visibility = "hidden";
})

closeButton.addEventListener("click", function () {
    mytest.style.visibility = "hidden";
})
btn.addEventListener("click", function () {
    mytest.style.visibility = "visible";
})

function openModal(idMovie) {
    fetch(`http://localhost:8000/api/v1/titles/${idMovie}`)
        .then(responses => responses.json())
        .then(datas => {
            titleMovie = document.querySelector(".modal-title-movie");
            titleMovie.innerText = datas.title;

            let imageMovie = document.createElement("img");
            imageMovie.src = datas.image_url;

            document.querySelector(".informations").prepend(imageMovie);

            detailsMovie = document.querySelector(".modal-details-movie");
            let genres = ""
            for (genre of datas.genres) {
                genres += ` ${genre}`
            };

            detailsMovie.innerText = `${genres} • ${datas.duration} minutes • ${datas.countries} • ${datas.date_published}`;

            rated = document.querySelector(".rated");
            rated.innerText = datas.rated;

            scoreImdb = document.querySelector(".score-imdb");
            scoreImdb.innerText = datas.imdb_score;

            let realisateurs = ""
            for (realisateur of datas.directors) {
                realisateurs += ` ${realisateur}`
            };

            directors = document.querySelector(".directors");
            directors.innerText = realisateurs;

            let acteurs = "";
            for (acteur of datas.actors) {
                acteurs += `, ${acteur}`;
            }
            test = acteurs.replace(",", "");

            actorsMovie = document.querySelector(".actors");
            actorsMovie.innerText = test;


        })
}

openModal('7822474');