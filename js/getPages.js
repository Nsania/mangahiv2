import {getPages, loadChapters} from "./functions.js";

const query = window.location.search;
const search = new URLSearchParams(query);
const mangaChapterID = search.get("chapterID");
const chapter = search.get("chapter");
const mangaID = localStorage.getItem("mangaID");

const prevButton = document.getElementById("previous_button");
const nextButton = document.getElementById("next_button");

let chaptersArray = await loadChapters(mangaID);
function findPreviousChapterID(chapterID, chaptersArray)
{
    let index;

    for(let i = 0; i < chaptersArray.length; i++)
    {
        if(chaptersArray[i].chapterID === chapterID)
        {
            index = i;
            break;
        }
    }

    if(index === chaptersArray.length - 1)
    {
        return -1;
    }
    return chaptersArray[index+1].chapterID;
}

function findPreviousChapterNum(chapterID, chaptersArray)
{
    let index;
    for(let i = 0; i < chaptersArray.length; i++)
    {
        if(chaptersArray[i].chapterID === chapterID)
        {
            index = i;
            break;
        }
    }
    if(index === chaptersArray.length - 1)
    {
        return -1;
    }
    //console.log(chaptersArray[index-1].chapterID);
    return chaptersArray[index+1].chapterNum;
}

let previousChapterID = findPreviousChapterID(mangaChapterID, chaptersArray);
let previousChapter = findPreviousChapterNum(mangaChapterID, chaptersArray);

if(previousChapterID === -1 && previousChapter === -1)
{
    prevButton.style.display = "none";
}

function loadPreviousChapter(previousChapter, previousChapterID)
{

    window.location.href = `reader.html?&chapter=${previousChapter}&chapterID=${previousChapterID}`
}

function findNextChapterID(chapterID, chaptersArray)
{
    let index;

    for(let i = 0; i < chaptersArray.length; i++)
    {
        if(chaptersArray[i].chapterID === chapterID)
        {
            index = i;
            break;
        }
    }

    if(index === 0)
    {
        return -1;
    }
    //console.log(chaptersArray[index-1].chapterID);
    return chaptersArray[index-1].chapterID;
}

function findNextChapterNum(chapterID, chaptersArray)
{
    let index;
    for(let i = 0; i < chaptersArray.length; i++)
    {
        if(chaptersArray[i].chapterID === chapterID)
        {
            index = i;
            break;
        }
    }
    if(index === 0)
    {
        return -1;
    }
    return chaptersArray[index-1].chapterNum;
}

let nextChapterID = findNextChapterID(mangaChapterID, chaptersArray);
let nextChapter = findNextChapterNum(mangaChapterID, chaptersArray);

if(nextChapterID === -1 && nextChapter === -1)
{
    nextButton.style.display = "none";
}

function loadNextChapter(nextChapter, nextChapterID)
{

    window.location.href = `reader.html?&chapter=${nextChapter}&chapterID=${nextChapterID}`
}
prevButton.addEventListener("click", function()
{
    loadPreviousChapter(previousChapter, previousChapterID);
});

nextButton.addEventListener("click", function()
{
    loadNextChapter(nextChapter, nextChapterID);
});

getPages(mangaChapterID);

