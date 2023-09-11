import {searchManga} from "./functions.js";

const query = window.location.search;
const search = new URLSearchParams(query);
const resultsHeader = document.getElementById("resultsHeader");
const searchResultsContainer = document.querySelector(".search_results");

let title = search.get("search");
resultsHeader.innerHTML = `"${title}" results`;

searchManga(title, searchResultsContainer);