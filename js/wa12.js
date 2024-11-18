const corsProxy = "https://corsproxy.io/?https://xkcd.com/";
const maxComicNumber = 3000;
const minComicNumber = 1;

const comicTitle = document.getElementById("comic-title");
const comicImage = document.getElementById("comic-image");
const comicAlt = document.getElementById("comic-alt");
const comicDate = document.getElementById("comic-date");
const newComicButton = document.getElementById("new-comic");

function fetchRandomComic() {
    const randomComicNumber = Math.floor(Math.random() * (maxComicNumber - minComicNumber + 1)) + minComicNumber;
    const apiUrl = `${corsProxy}${randomComicNumber}/info.0.json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            comicTitle.textContent = data.title;
            comicImage.src = data.img;
            comicImage.alt = data.alt;
            comicAlt.textContent = data.alt;
            comicDate.textContent = `Published on: ${data.month}/${data.day}/${data.year}`;
        })
        .catch(error => {
            console.error("Error:", error);
            comicTitle.textContent = "Error Loading Comic";
            comicImage.src = "";
            comicAlt.textContent = "Could not load comic. Try again!";
            comicDate.textContent = "";
        });
}

newComicButton.addEventListener("click", fetchRandomComic);

fetchRandomComic();

