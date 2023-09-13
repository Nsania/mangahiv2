import {getPages, loadChapters} from "./functions.js";

const query = window.location.search;
const search = new URLSearchParams(query);
const mangaChapterID = search.get("chapterID");
const chapter = search.get("chapter");
const chapterTitle = search.get("chapterTitle");

const chapterListButton = document.getElementById("chapter_list_button");
const prevButton = document.getElementById("previous_button");
const nextButton = document.getElementById("next_button");

const chapterListButton2 = document.getElementById("chapter_list_button2");
const prevButton2 = document.getElementById("previous_button2");
const nextButton2 = document.getElementById("next_button2");

const mangaID = localStorage.getItem("mangaID");
const mangaTitle = localStorage.getItem("mangaTitle");
const coverFileName = localStorage.getItem("coverFileName");
const mangaDesc = localStorage.getItem("mangaDesc");

const chapterSelectButton = document.getElementById("chapter_select_drop_down");
const chapterSelectLabel = document.getElementById("chapter_selected");
const chapterSelectList = document.getElementById("chapter_select_list");

chapterSelectLabel.textContent = `Chapter ${chapter}: ${chapterTitle}`;

let chaptersArray = await loadChapters(mangaID);

chaptersArray.forEach(e => {
    let option = document.createElement("a");
    option.href = `reader.html?&chapter=${e.chapterNum}&chapterID=${e.chapterID}`;
    option.textContent = `Chapter ${e.chapterNum}: ${e.chapterTitle}`;

    chapterSelectList.appendChild(option);
});

chapterSelectList.style.visibility = 'hidden';
chapterSelectButton.addEventListener('click', function()
{
    if(chapterSelectList.style.visibility === 'hidden')
    {
        chapterSelectList.style.visibility = 'visible'
        console.log("Hello");
    }
    else
    {
        chapterSelectList.style.visibility = 'hidden';
    }
});

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

prevButton2.addEventListener("click", function()
{
    loadPreviousChapter(previousChapter, previousChapterID);
});

nextButton.addEventListener("click", function()
{
    loadNextChapter(nextChapter, nextChapterID);
});

nextButton2.addEventListener("click", function()
{
    loadNextChapter(nextChapter, nextChapterID);
});

function goToChapterList(mangaTitle, mangaID, coverFileName, mangaDesc)
{
    window.location.href = `manga2.html?mangaTitle=${mangaTitle}&mangaID=${mangaID}&coverFileName=${coverFileName}&mangaDesc=${mangaDesc}`;
}

chapterListButton.addEventListener('click', function()
{
    goToChapterList(mangaTitle, mangaID, coverFileName, mangaDesc);
});

chapterListButton2.addEventListener('click', function()
{
    goToChapterList(mangaTitle, mangaID, coverFileName, mangaDesc);
});


getPages(mangaChapterID);

