import {getChapters} from "./functions.js";

const query = window.location.search;
const search = new URLSearchParams(query);

const mangaID = search.get("mangaID");
const mangaTitle = search.get("mangaTitle");

const header = document.getElementById("header");
header.innerHTML = mangaTitle;

getChapters(mangaID);