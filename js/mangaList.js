import {getChapters} from "./functions.js";

let mangaTitle = localStorage.getItem("mangaTitle")
let mangaID = localStorage.getItem("mangaID");

const header = document.getElementById("header");
header.innerHTML = mangaTitle;

try
{
    getChapters(mangaID);
    console.log(mangaID);
}
catch(error)
{
    console.log(error);
}


