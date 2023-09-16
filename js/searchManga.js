import {getSuggestions, searchManga, getRandomManga} from "./functions.js";

const searchBar = document.getElementById("search");
const searchContainer = document.querySelector(".search_container");
const searchBarSmol = document.getElementById("search_smol");
const searchContainerSmol = document.querySelector(".search_container_smol");
const cover_container = document.getElementById("cover");
const resultsContainer = document.querySelector(".results");
const resultsManga = document.querySelector(".results_manga");
const resultsSkeleton = document.querySelector(".results_skeleton");
const resultsPlaceHolder = document.querySelector(".results_placeholder");
const discovery = document.querySelector(".discovery");

let title;
let inputBuffer = ''; // Store the input in a buffer
let timeoutId; // Store the timeout ID


resultsContainer.style.visibility = "visible";
resultsManga.style.display = "none";
resultsSkeleton.style.display = "none";
resultsPlaceHolder.style.display = "none";
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

    if(!resultsManga.firstChild)
    {
        resultsPlaceHolder.style.display = "flex";
    }
})

searchBarSmol.addEventListener("blur", function()
{
    searchContainerSmol.style.opacity = "0";
    resultsContainer.style.visibility = "hidden";
    resultsContainer.style.opacity = "0";
    resultsPlaceHolder.style.display = "none";
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

async function printInput()
{
    if (inputBuffer.trim() !== '')
    {
        resultsManga.style.display = "none";
        resultsPlaceHolder.style.display = "none";
        resultsSkeleton.style.display = "flex";
        console.log(`Input:${inputBuffer}`);
        let query = await getSuggestions(inputBuffer);
        if(query === 1)
        {
            resultsSkeleton.style.display = "none";
            resultsManga.style.display = "flex";
        }
    }
    else
    {
        console.log("Hello");
        resultsManga.style.display = "none";
        while(resultsManga.firstChild)
        {
            resultsManga.removeChild(resultsManga.firstChild);
        }
        resultsPlaceHolder.style.display = "flex";
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
        timeoutId = setTimeout(printInput, 200); // Print the input after half a second
    }
}


// getRandomManga(discovery);
// getRandomManga(discovery);
// getRandomManga(discovery);
// getRandomManga(discovery);
// getRandomManga(discovery);
// getRandomManga(discovery);
