import {getChapters, initialScroll, headerFunctionalities} from "./functions.js";

const query = window.location.search;
const search = new URLSearchParams(query);

const mangaID = search.get("mangaID");
const mangaTitle = search.get("mangaTitle");
const coverFileName = search.get("coverFileName");
const mangaDesc = search.get("mangaDesc");

localStorage.setItem("mangaID", mangaID);
localStorage.setItem("mangaTitle", mangaTitle);
localStorage.setItem("coverFileName", coverFileName);
localStorage.setItem("mangaDesc", mangaDesc);

const header = document.getElementById("header");
header.innerHTML = mangaTitle;
const description = document.getElementById("manga_desc");
description.innerHTML = mangaDesc;

const cover = document.getElementById("cover_art");
cover.src = `https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}.256.jpg`;

initialScroll();
headerFunctionalities();
getChapters(mangaID);