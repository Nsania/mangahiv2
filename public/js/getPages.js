import {getPages, loadChapters, headerFunctionalities} from "./functions.js";

headerFunctionalities();

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

document.title = `${chapter} | ${chapterTitle}`;

const chapterSelectButton = document.getElementById("chapter_select_drop_down");
const chapterSelectLabel = document.getElementById("chapter_selected");
const chapterSelectList = document.getElementById("chapter_select_list");

const readerSkeleton = document.getElementById("reader-skeleton");
const reader = document.getElementById("reader");
const scrollUp = document.getElementById("scroll-up");

readerSkeleton.style.display = "flex";
reader.style.display = "none";
chapterSelectList.style.display = "none";


chapterSelectLabel.textContent = `Chapter ${chapter}: ${chapterTitle}`;

let chaptersArray = await loadChapters(mangaID);


chaptersArray.forEach(e => {
    let option = document.createElement("a");
    option.href = `reader.html?&chapter=${e.chapterNum}&chapterID=${e.chapterID}&chapterTitle=${e.chapterTitle}`;
    option.textContent = `Chapter ${e.chapterNum}: ${e.chapterTitle}`;

    chapterSelectList.appendChild(option);
});

let index;

for(let i = 0; i < chaptersArray.length; i++)
{
    if(chaptersArray[i].chapterID === mangaChapterID)
    {
        index = i;
        break;
    }
}


chapterSelectButton.addEventListener('click', function()
{
    if(chapterSelectList.style.display === 'none')
    {
        chapterSelectList.style.display = 'flex'
        chapterSelectList.scrollTop = chapterSelectList.children[index].offsetTop;

    }
    else
    {
        chapterSelectList.style.display = 'none';
    }
});


chapterSelectList.addEventListener("scroll", updateY);

function updateY()
{
    const scrollY = chapterSelectList.scrollTop;

    console.log(scrollY);
}


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

function findPreviousChapterTitle(chapterID, chaptersArray)
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
    return chaptersArray[index+1].chapterTitle;
}

let previousChapterID = findPreviousChapterID(mangaChapterID, chaptersArray);
let previousChapter = findPreviousChapterNum(mangaChapterID, chaptersArray);
let previousChapterTitle = findPreviousChapterTitle(mangaChapterID, chaptersArray);

if(previousChapterID === -1 && previousChapter === -1)
{
    prevButton.style.display = "none";
}

function loadPreviousChapter(previousChapter, previousChapterID, previousChapterTitle)
{
    window.location.href = `reader.html?&chapter=${previousChapter}&chapterID=${previousChapterID}&chapterTitle=${previousChapterTitle}`;
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

function findNextChapterTitle(chapterID, chaptersArray)
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
    return chaptersArray[index-1].chapterTitle;
}

let nextChapterID = findNextChapterID(mangaChapterID, chaptersArray);
let nextChapter = findNextChapterNum(mangaChapterID, chaptersArray);
let nextChapterTitle = findNextChapterTitle(mangaChapterID, chaptersArray);

if(nextChapterID === -1 && nextChapter === -1)
{
    nextButton.style.display = "none";
}

function loadNextChapter(nextChapter, nextChapterID, nextChapterTitle)
{

    window.location.href = `reader.html?&chapter=${nextChapter}&chapterID=${nextChapterID}&chapterTitle=${nextChapterTitle}`;
}
prevButton.addEventListener("click", function()
{
    loadPreviousChapter(previousChapter, previousChapterID, previousChapterTitle);
});

prevButton2.addEventListener("click", function()
{
    loadPreviousChapter(previousChapter, previousChapterID, previousChapterTitle);
});

nextButton.addEventListener("click", function()
{
    loadNextChapter(nextChapter, nextChapterID, nextChapterTitle);
});

nextButton2.addEventListener("click", function()
{
    loadNextChapter(nextChapter, nextChapterID, nextChapterTitle);
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

scrollUp.addEventListener("click", function()
{
   window.scrollTo(0,0);
});

let result = await getPages(mangaChapterID);

if(result === 1)
{
    readerSkeleton.style.display = "none";
    reader.style.display = "block";
}
else
{
    console.log("No")
}

