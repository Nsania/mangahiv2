import {searchManga} from "./functions.js";

const searchBar = document.getElementById("search");
const searchButton = document.getElementById("search_button");
const cover_container = document.getElementById("cover");
let title;

searchButton.addEventListener("click", function()
{
    title = searchBar.value;
    searchManga(title, cover_container);
});
