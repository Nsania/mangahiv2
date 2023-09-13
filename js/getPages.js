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
    //console.log(chaptersArray[index-1].chapterID);
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
    //console.log(chaptersArray[index-1].chapterID);
    return chaptersArray[index+1].chapterNum;
}

let previousChapterID = findPreviousChapterID(mangaChapterID, chaptersArray);
let previousChapter = findPreviousChapterNum(mangaChapterID, chaptersArray);

function loadPreviousChapter(previousChapter, previousChapterID)
{
    window.location.href = `reader.html?&chapter=${previousChapter}&chapterID=${previousChapterID}`
}
prevButton.addEventListener("click", function()
{
    loadPreviousChapter(previousChapter, previousChapterID);
});

getPages(mangaChapterID);

