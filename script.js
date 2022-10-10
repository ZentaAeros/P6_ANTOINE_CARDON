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

function createSectionCategory(name, categoryName = "") {
    let genre = ""
    if (name !== "") {
        genre = name
    } else {
        name = "best-rated";
    }
    let section = document.createElement("section");
    section.setAttribute("id", name);

    let titleCategory = document.createElement("h2");
    titleCategory.innerText = `${categoryName}`;

    let content = document.createElement("section");
    content.setAttribute("id", `content-${name}`);

    fetch(`http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=${genre}`)
        .then(responses => responses.json())
        .then(datas => {
            for (let data of datas.results) {
                let movieContainer = document.createElement("figure");
                movieContainer.classList.add("movie-container");

                movieContent = document.createElement("figcaption");
                movieContent.classList.add("movie-content");

                let movieControls = document.createElement("div");
                movieControls.classList.add("movie-controls");

                let buttonPlay = document.createElement("button");
                buttonPlay.innerText = "Lecture";

                let buttonDetails = document.createElement("button");
                buttonDetails.innerText = "Détails";
                buttonDetails.setAttribute("onclick", `openModal('${data.id}')`);
                buttonDetails.classList.add("open-modal");

                let movieTitle = document.createElement("h3");
                movieTitle.innerText = data.title;

                let movieImage = document.createElement("img");
                movieImage.src = data.image_url;
                movieImage.classList.add("movie-img");

                movieContainer.appendChild(movieImage);
                movieContainer.appendChild(movieContent);

                movieControls.appendChild(buttonPlay);
                movieControls.appendChild(buttonDetails);

                movieContent.appendChild(movieTitle);
                movieContent.appendChild(movieControls);



                content.appendChild(movieContainer);
            }
            fetch(datas.next)
                .then(responses => responses.json())
                .then(datas => {
                    for (let i = 0; i < 2; i++) {
                        let movieContainer = document.createElement("figure");
                        movieContainer.classList.add("movie-container");

                        movieContent = document.createElement("figcaption");
                        movieContent.classList.add("movie-content");

                        let movieControls = document.createElement("div");
                        movieControls.classList.add("movie-controls");

                        let buttonPlay = document.createElement("button");
                        buttonPlay.innerText = "Lecture";

                        let buttonDetails = document.createElement("button");
                        buttonDetails.innerText = "Détails";
                        buttonDetails.setAttribute("onclick", `openModal('${datas.results[i].id}')`);
                        buttonDetails.classList.add("open-modal");

                        let movieTitle = document.createElement("h3");
                        movieTitle.innerText = datas.results[i].title;

                        let movieImage = document.createElement("img");
                        movieImage.src = datas.results[i].image_url;
                        movieImage.classList.add("movie-img");

                        movieContainer.appendChild(movieImage);
                        movieContainer.appendChild(movieContent);

                        movieControls.appendChild(buttonPlay);
                        movieControls.appendChild(buttonDetails);

                        movieContent.appendChild(movieTitle);
                        movieContent.appendChild(movieControls);



                        content.appendChild(movieContainer);
                    }
                })
        })

    section.appendChild(titleCategory);
    section.appendChild(content);
    document.getElementById("categorys").appendChild(section);
    let btnLeft = document.createElement("button");
    btnLeft.classList.add("btn-left");
    btnLeft.innerHTML = '<i class="fa-solid fa-2x fa-arrow-left-long"></i>'
    btnLeft.setAttribute("onclick", `moveLeft("content-${name}")`);

    let btnRight = document.createElement("button");
    btnRight.classList.add("btn-right");
    btnRight.innerHTML = '<i class="fa-solid fa-2x fa-arrow-right-long"></i>'
    btnRight.setAttribute("onclick", `moveRight("content-${name}")`);

    section.appendChild(btnLeft);
    section.appendChild(btnRight);



}

bestMovie('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score');


createSectionCategory("", "Les films du moment")
createSectionCategory("horror", "Les films d'horreurs du moment");
createSectionCategory("comedy", "Les comédies du moment");
createSectionCategory("thriller", "Les thrillers du moment");





function moveLeft(categoryName) {
    document.getElementById(categoryName).style.left = "0px";
}

function moveRight(categoryName) {
    document.getElementById(categoryName).style.left = "-580px";
}

function openModal(idMovie) {
    fetch(`http://localhost:8000/api/v1/titles/${idMovie}`)
        .then(responses => responses.json())
        .then(datas => {
            titleMovie = document.querySelector(".modal-title-movie");
            titleMovie.innerText = datas.title;

            let imageMovie = document.querySelector(".cover-movie");
            imageMovie.src = datas.image_url;

            detailsMovie = document.querySelector(".modal-details-movie");
            let genres = ""
            for (let genre of datas.genres) {
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

            let resumeMovie = document.querySelector(".resume-movie");
            resumeMovie.innerText = datas.long_description;


        })


    let modal = document.querySelector(".modal");
    overlay = document.querySelector(".overlay");
    closeButton = document.querySelector(".btn-close")
    overlay.addEventListener("click", function () {
        modal.style.visibility = "hidden";
    })

    closeButton.addEventListener("click", function () {
        modal.style.visibility = "hidden";
    })
    modal.style.visibility = "visible";
}
