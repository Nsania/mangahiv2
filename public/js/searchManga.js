import {getRandomManga, headerFunctionalities, getFeaturedMangas} from "./functions.js";

const discovery = document.querySelector(".discovery");
const discoverySkeleton = document.querySelector(".discovery_skeleton");
const featuredSpinner = document.querySelector(".featured_loading");
const featured = document.querySelector(".featured_container");

featured.style.display = "none";
featuredSpinner.style.display = "flex";

headerFunctionalities();

discovery.style.display = "none";
let isDiscoveryDone = false;

for(let i = 0; i < 6; i++)
{
    await getRandomManga(discovery);
    if(i === 5)
    {
        isDiscoveryDone = true;
    }
}

if(isDiscoveryDone)
{
    discoverySkeleton.style.display = "none";
    discovery.style.display = "flex";
}

let mangaArray = ["Aishiteru Game Wo Owarasetai", "Horimiya", "Call of the Night", "Frieren", "Jujutsu Kaisen"];
let containerArray = ["f1", "f2", "f3", "f4", "f5"];
let status = -1;

for(let i = 0; i < 5; i++)
{
    getFeaturedMangas(mangaArray[i], containerArray[i]);
    if(i === 4)
    {
        status = 1;
    }
}

if(status === 1)
{
    featuredSpinner.style.display = "none";
    featured.style.display = "flex";
}


