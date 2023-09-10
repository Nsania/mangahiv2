import {getPages} from "./functions.js";

const query = window.location.search;
const search = new URLSearchParams(query);

const mangaChapterID = search.get("mangaChapterID");
getPages(mangaChapterID);
console.log(mangaChapterID);

