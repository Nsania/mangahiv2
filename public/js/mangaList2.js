import {getChapters, headerFunctionalities} from "./functions.js";

headerFunctionalities();
const query = window.location.search;
const search = new URLSearchParams(query);

const mangaID = search.get("mangaID");
const mangaTitle = search.get("mangaTitle");
const coverFileName = search.get("coverFileName");
const mangaDesc = search.get("mangaDesc");

document.title = `${mangaTitle} - MangaHi`;

localStorage.setItem("mangaID", mangaID);
localStorage.setItem("mangaTitle", mangaTitle);
localStorage.setItem("coverFileName", coverFileName);
localStorage.setItem("mangaDesc", mangaDesc);

const header = document.getElementById("header");
header.innerHTML = mangaTitle;
const description = document.getElementById("manga_desc");
description.innerHTML = mangaDesc;
const chapterList = document.getElementById("chapterList");
const chapterListSkeleton = document.getElementById("chapterList-skeleton");
const cover = document.getElementById("cover_art");
cover.src = `https://mangahiproxy.onrender.com/cover-source-proxy?mangaID=${mangaID}&coverID=${coverFileName}.256.jpg`;
const loaderContainer = document.querySelector(".chapterList_container_spinner");

loaderContainer.style.display = "flex";
chapterList.style.display = "none";
chapterListSkeleton.style.display = "flex";

let getChaptersResult = await getChapters(mangaID);

if(getChaptersResult === 1)
{
    chapterListSkeleton.style.display = "none";
    chapterList.style.display = "flex";
}
else
{
    console.log("Error retrieving chapters");
}