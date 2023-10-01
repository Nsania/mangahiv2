import {getRandomManga, initialScroll, headerFunctionalities} from "./functions.js";


const discovery = document.querySelector(".discovery");
const discoverySkeleton = document.querySelector(".discovery_skeleton");

initialScroll();
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
