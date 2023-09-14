import {getSuggestions, searchManga, getRandomManga} from "./functions.js";

const searchBar = document.getElementById("search");
const searchButton = document.getElementById("search_button");
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

function handleInput()
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

searchBar.addEventListener("input", handleInput);


searchButton.addEventListener("click", function()
{
    title = searchBar.value;
    if(title.trim() !== "")
    {
        window.location.href = `search.html?search=${title}`;
    }
    //searchManga(title, cover_container);
});

getRandomManga(discovery);
getRandomManga(discovery);
getRandomManga(discovery);
