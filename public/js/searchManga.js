import {getRandomManga, headerFunctionalities, getFeaturedMangas} from "./functions.js";

const discovery = document.querySelector(".discovery");
const discoverySkeleton = document.querySelector(".discovery_skeleton");
const featuredSpinner = document.querySelector(".featured_loading");
const featuredContainer = document.querySelector(".featured_container");
const slider = document.querySelector(".slider");

const featured = document.querySelector(".featured");
const nav1 = document.getElementById("nav1");
const nav2 = document.getElementById("nav2");
const nav3 = document.getElementById("nav3");
const nav4 = document.getElementById("nav4");
const nav5 = document.getElementById("nav5");

featuredContainer.style.display = "none";
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

let mangaArray = ["Aishiteru Game Wo Owarasetai", "Horimiya", "Yofukashi no Uta", "Frieren", "Jujutsu Kaisen"];
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
    featuredContainer.style.display = "flex";
}

let featuredWidth = featured.scrollWidth - 1;
console.log(`Width: ${featuredWidth}`);

nav1.style.opacity = "1";
nav2.style.opacity = "0.50";
nav3.style.opacity = "0.50";
nav4.style.opacity = "0.50";
nav5.style.opacity = "0.50";

slider.addEventListener('scroll', function()
{
    featuredWidth = featured.scrollWidth - 1;

    let scroll = slider.scrollLeft;

    //console.log(slider.scrollLeft);

    if(scroll >= 0 && scroll < featuredWidth - 1)
    {
        nav1.style.opacity = "1";
        nav2.style.opacity = "0.50";
        nav3.style.opacity = "0.50";
        nav4.style.opacity = "0.50";
        nav5.style.opacity = "0.50";
    }
    else if(scroll >= featuredWidth && scroll < (featuredWidth*2))
    {
        nav2.style.opacity = "1";
        nav1.style.opacity = "0.50";
        nav3.style.opacity = "0.50";
        nav4.style.opacity = "0.50";
        nav5.style.opacity = "0.50";
    }
    else if(scroll >= featuredWidth*2 && scroll < (featuredWidth*3))
    {
        nav3.style.opacity = "1";
        nav1.style.opacity = "0.50";
        nav2.style.opacity = "0.50";
        nav4.style.opacity = "0.50";
        nav5.style.opacity = "0.50";
    }
    else if(scroll >= featuredWidth*3 && scroll < (featuredWidth*4))
    {
        nav4.style.opacity = "1";
        nav1.style.opacity = "0.50";
        nav2.style.opacity = "0.50";
        nav3.style.opacity = "0.50";
        nav5.style.opacity = "0.50";
    }
    else if(scroll >= featuredWidth*4 && scroll < (featuredWidth*5))
    {
        nav5.style.opacity = "1";
        nav1.style.opacity = "0.50";
        nav2.style.opacity = "0.50";
        nav3.style.opacity = "0.50";
        nav4.style.opacity = "0.50";
    }
});

nav1.addEventListener("click", function ()
{
    slider.scrollLeft = 0;
});
nav2.addEventListener("click", function ()
{
    slider.scrollLeft = featuredWidth;
});
nav3.addEventListener("click", function ()
{
    slider.scrollLeft = featuredWidth*2;
});
nav4.addEventListener("click", function ()
{
    slider.scrollLeft = featuredWidth*3;
});
nav5.addEventListener("click", function ()
{
    slider.scrollLeft = featuredWidth*4;
});


