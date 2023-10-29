import {searchManga, headerFunctionalities} from "./functions.js";

headerFunctionalities();

const query = window.location.search;
const search = new URLSearchParams(query);
const resultsHeader = document.getElementById("resultsHeader");
const searchResultsContainer = document.querySelector(".search_results");
const results = document.querySelector(".search_results");
const resultsSkeleton = document.querySelector(".results_loader");

resultsSkeleton.style.display = "flex";
results.style.display = "none";
let title = search.get("search");
resultsHeader.innerHTML = `"${title}" results`;

let status = await searchManga(title, searchResultsContainer, 100);

if(status === 1)
{
    resultsSkeleton.style.display = "none";
    results.style.display = "flex";
}
else
{
    console.log("Unable to retrieve results")
}