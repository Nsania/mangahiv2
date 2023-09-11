import {getPages} from "./functions.js";
import {moveChapters} from "./functions.js";

const query = window.location.search;
const search = new URLSearchParams(query);
const mangaChapterID = search.get("chapterID");
const mangaID = search.get("mangaID");

const prevButton = document.getElementById("previous_button");
const nextButton = document.getElementById("next_button");

const previousChapID = search.get("prevChapID");
const nextChapID = search.get("nextChapID");

getPages(mangaChapterID);
console.log(mangaChapterID);

