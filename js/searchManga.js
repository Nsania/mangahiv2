import {getSuggestions, searchManga, getRandomManga} from "./functions.js";

const searchBar = document.getElementById("search");
const searchContainer = document.querySelector(".search_container");
const searchBarSmol = document.getElementById("search_smol");
const searchContainerSmol = document.querySelector(".search_container_smol");

//const searchButton = document.getElementById("search_button");
const cover_container = document.getElementById("cover");
const resultsContainer = document.getElementById("results");
const discovery = document.querySelector(".discovery");
let title;


let inputBuffer = ''; // Store the input in a buffer
let timeoutId; // Store the timeout ID

function printInput()
{
    if (inputBuffer.trim() !== ' ')
    {
        console.log(`Input:${inputBuffer}`);
        getSuggestions(inputBuffer);
    }
    inputBuffer = ''; // Clear the buffer after printing
}

function handleInput(searchBar)
{
    const inputValue = searchBar.value;

    if(timeoutId)
    {
        clearTimeout(timeoutId); // Clear the previous timeout
    }

    // Use a regular expression to check for consecutive spaces
    if (!/  /.test(inputValue))
    {
        inputBuffer = inputValue; // Store the current input in the buffer
        timeoutId = setTimeout(printInput, 500); // Print the input after half a second
    }
}
resultsContainer.style.visibility = "hidden";
//searchBar.style.visibility = "hidden";

searchBarSmol.addEventListener("input", function()
{
    handleInput(searchBarSmol);
    //resultsContainer.style.height = "700px";
});

searchBarSmol.addEventListener("focus", function()
{
    searchContainerSmol.style.opacity = "1";
    resultsContainer.style.visibility = "visible";
    resultsContainer.style.opacity = "1";
})

searchBarSmol.addEventListener("blur", function()
{
    searchContainerSmol.style.opacity = "0";
    resultsContainer.style.visibility = "hidden";
    resultsContainer.style.opacity = "0";
});

searchBar.addEventListener("input", function()
{
    handleInput(searchBar);
    resultsContainer.style.height = "700px";
});

searchBar.addEventListener("focus", function()
{
    resultsContainer.style.visibility = "visible";
    searchContainer.style.width = "500px";
    resultsContainer.style.height = "80px";
    resultsContainer.style.opacity = "1";
    searchBar.style.visibility = "visible";
});

searchBar.addEventListener("blur", function()
{
    resultsContainer.style.visibility = "hidden";
    searchContainer.style.width = "250px";
    resultsContainer.style.height = "1px";
    resultsContainer.style.opacity = "0";
});


// getRandomManga(discovery);
// getRandomManga(discovery);
// getRandomManga(discovery);
// getRandomManga(discovery);
// getRandomManga(discovery);
// getRandomManga(discovery);
