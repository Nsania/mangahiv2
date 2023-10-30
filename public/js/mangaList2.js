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
const chapterList = document.getElementById("chapterList");
const chapterListSkeleton = document.getElementById("chapterList-skeleton");
const cover = document.getElementById("cover_art");
cover.src = `https://mangahiproxy.onrender.com/cover-source-proxy?mangaID=${mangaID}&coverID=${coverFileName}.256.jpg`;

chapterList.style.display = "none";
chapterListSkeleton.style.display = "flex";
headerFunctionalities();
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