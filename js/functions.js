//library for various function to be used in my manga reader
export async function getSuggestions(searchContent)
{
    const resultsContainer = document.getElementById("results");


    while(resultsContainer.firstChild)
    {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }

    if(searchContent.trim() !== '')
    {
        let response = await fetch(`https://api.mangadex.org/manga?title=${searchContent}&limit=5`);

        if(response.ok)
        {
            let json_data = await response.json();

            if(json_data.data.length > 0)
            {
                let i = 0;

                while(i < json_data.data.length)
                {
                    let mangaID = json_data.data[i].id;
                    let mangaTitle = json_data.data[i].attributes.title.en;
                    let mangaDesc = json_data.data[i].attributes.description.en;
                    let mangaCoverFileName;

                    if(mangaID != null)
                    {
                        let response2 = await fetch(`https://api.mangadex.org/cover?limit=1&manga[]=${mangaID}`);

                        if(response2.ok)
                        {
                            let json_data2 = await response2.json();

                            if(json_data2.data.length > 0)
                            {
                                mangaCoverFileName = json_data2.data[0].attributes.fileName;
                            }
                        }
                        else
                        {
                            console.log("cover id not found");
                        }
                    }

                    if(mangaCoverFileName != null)
                    {

                        let suggestion_container = document.createElement("div");
                        let suggestion_link = document.createElement("a");
                        suggestion_link.href = `manga2.html?mangaTitle=${mangaTitle}&mangaID=${mangaID}&coverFileName=${mangaCoverFileName}&mangaDesc=${mangaDesc}`;

                        let suggestion_image = document.createElement("img");
                        suggestion_image.src = `https://uploads.mangadex.org/covers/${encodeURIComponent(mangaID)}/${encodeURIComponent(mangaCoverFileName)}.256.jpg`;
                        let suggestion_title = document.createElement("h1");
                        suggestion_title.textContent = `${mangaTitle}`;

                        suggestion_link.appendChild(suggestion_image);
                        suggestion_container.appendChild(suggestion_link);
                        suggestion_container.appendChild(suggestion_title);

                        resultsContainer.appendChild(suggestion_container);
                    }
                    console.log(mangaTitle);
                    i++;
                }
            }
        }
    }
    else
    {
        console.log("empty");
    }


}

//this method will search for the manga ID, cover ID, cover file name. It will display the cover art in the image container
export async function searchManga(title, container)
{
    if(title.trim() !== "") {
        // Make a GET request to the MangaDex API search endpoint
        const response = await fetch(`https://api.mangadex.org/manga?title=${title}&limit=10`);
        // Check if the request was successful (status code 200)
        if (response.ok) {
            const json_data = await response.json();
            // Check if the data contains results
            if (json_data.data.length > 0) {
                let i = 0;

                while (i < json_data.data.length)
                {
                    let mangaID = json_data.data[i].id;
                    let mangaTitle = json_data.data[i].attributes.title.en;
                    let mangaDesc = json_data.data[i].attributes.description.en;
                    let mangaCoverFileName;

                    if (mangaID != null) {
                        let response2 = await fetch(`https://api.mangadex.org/cover?limit=1&manga[]=${mangaID}`);

                        if(response2.ok)
                        {
                            let json_data2 = await response2.json();

                            if (json_data2.data.length > 0)
                            {
                                mangaCoverFileName = json_data2.data[0].attributes.fileName;
                            }
                        }
                        else
                        {
                            console.log("Cover ID not found");
                        }
                    }

                    if (mangaCoverFileName != null) {

                        let suggestion_container = document.createElement("div");
                        let suggestion_link = document.createElement("a");
                        suggestion_link.href = `manga2.html?mangaTitle=${mangaTitle}&mangaID=${mangaID}&coverFileName=${mangaCoverFileName}&mangaDesc=${mangaDesc}`;

                        let suggestion_image = document.createElement("img");
                        suggestion_image.src = `https://uploads.mangadex.org/covers/${encodeURIComponent(mangaID)}/${encodeURIComponent(mangaCoverFileName)}.256.jpg`;
                        let suggestion_title = document.createElement("h1");
                        suggestion_title.textContent = `${mangaTitle}`;

                        suggestion_link.appendChild(suggestion_image);
                        suggestion_container.appendChild(suggestion_link);
                        suggestion_container.appendChild(suggestion_title);

                        container.appendChild(suggestion_container);
                    }
                    console.log(mangaTitle);
                    i++;
                }
            }
        }
    }
}


//method will get manga feed (all chapters available)
export async function getChapters(mangaID)
{
    const response = await fetch(`https://api.mangadex.org/manga/${mangaID}/feed?limit=100&translatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&includeFutureUpdates=1&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5BpublishAt%5D=asc&order%5BreadableAt%5D=asc&order%5Bvolume%5D=asc&order%5Bchapter%5D=asc&includeEmptyPages=0`);

    localStorage.setItem("mangaID", mangaID);

    let chapters = {};
    let chaptersArray = [];
    let chapterList = document.getElementById("chapterList");

    if(response.ok)
    {
        const json_data = await response.json();

        let total = json_data.total;
        let requests = Math.ceil(total/100);

        console.log(`Total: ${total}`);
        console.log(`Requests: ${requests}`);

        let i = 0;
        let offset = 0;

        while(i < requests)
        {
            const response2 = await fetch(`https://api.mangadex.org/manga/${mangaID}/feed?limit=100&offset=${offset}&translatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&includeFutureUpdates=1&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5BpublishAt%5D=asc&order%5BreadableAt%5D=asc&order%5Bvolume%5D=asc&order%5Bchapter%5D=asc`);

            if(response2.ok)
            {
                const json_data2 = await response2.json();

                if(json_data2.data != null)
                {
                    for(let j = 0; j < json_data2.data.length; j++)
                    {
                        console.log(json_data2.data[j].id);
                        console.log(json_data2.data[j].attributes.chapter);
                        console.log(json_data2.data[j].attributes.title);

                        chaptersArray.push({chapterID: json_data2.data[j].id, chapterNum: json_data2.data[j].attributes.chapter, chapterTitle: json_data2.data[j].attributes.title});
                    }
                }
                else
                {
                    console.log("JSON empty");
                }
            }
            i++;
            offset+=100;
        }

        chaptersArray = chaptersArray.sort(function(a,b){return b.chapterNum - a.chapterNum});

        chaptersArray.forEach(function(element)
        {
            let chapter = document.createElement("a");
            chapter.href = `reader.html?&chapter=${element.chapterNum}&chapterID=${element.chapterID}&chapterTitle=${element.chapterTitle}`;
            chapter.textContent = `Chapter ${element.chapterNum}: ${element.chapterTitle}`;


            chapterList.appendChild(chapter);
        });


    }
    else
    {
        console.log("Error in API request");
    }
}

//method will get pages for each chapter
export async function getPages(mangaChapterID)
{

    const response = await fetch(`https://api.mangadex.org/at-home/server/${mangaChapterID}`);
    let reader = document.getElementById("reader");

    if(response.ok)
    {
        const json_data = await response.json();

        if(json_data != null)
        {
            const hash = json_data.chapter.hash;
            console.log(hash);
            console.log(json_data.chapter.data.length);

            let i = 0;

            while(i < json_data.chapter.data.length)
            {
                let image = document.createElement("img");
                image.src = `https://uploads.mangadex.org/data/${hash}/${json_data.chapter.data[i]}`;

                reader.appendChild(image);
                i++;
            }
        }
    }
}

export async function loadChapters(mangaID)
{
    const response = await fetch(`https://api.mangadex.org/manga/${mangaID}/feed?limit=100&translatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&includeFutureUpdates=1&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5BpublishAt%5D=asc&order%5BreadableAt%5D=asc&order%5Bvolume%5D=asc&order%5Bchapter%5D=asc&includeEmptyPages=0`);

    let chapters = {};
    let chaptersArray = [];
    let chapterList = document.getElementById("chapterList");

    if(response.ok)
    {
        const json_data = await response.json();

        let total = json_data.total;
        let requests = Math.ceil(total/100);

        console.log(`Total: ${total}`);
        console.log(`Requests: ${requests}`);

        let i = 0;
        let offset = 0;

        while(i < requests)
        {
            const response2 = await fetch(`https://api.mangadex.org/manga/${mangaID}/feed?limit=100&offset=${offset}&translatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&includeFutureUpdates=1&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5BpublishAt%5D=asc&order%5BreadableAt%5D=asc&order%5Bvolume%5D=asc&order%5Bchapter%5D=asc`);

            if(response2.ok)
            {
                const json_data2 = await response2.json();

                if(json_data2.data != null)
                {
                    for(let j = 0; j < json_data2.data.length; j++)
                    {
                        chaptersArray.push({chapterID: json_data2.data[j].id, chapterNum: json_data2.data[j].attributes.chapter, chapterTitle: json_data2.data[j].attributes.title});
                    }
                }
                else
                {
                    console.log("JSON empty");
                }
            }

            i++;
            offset+=100;
        }

        chaptersArray = chaptersArray.sort(function(a,b){return b.chapterNum - a.chapterNum});

    }
    else
    {
        console.log("Error in API request");
    }

    return chaptersArray;
}

export async function getRandomManga(container)
{
    const response = await fetch(`https://api.mangadex.org/manga/random`);

    if(response.ok)
    {
        const json_data = await response.json();

        console.log(json_data.data.id);
        console.log(json_data.data.attributes.title.en);
        console.log(json_data.data.attributes.description.en)

        const mangaID = json_data.data.id;
        const mangaTitle = json_data.data.attributes.title.en;
        const mangaDesc = json_data.data.attributes.description.en;
        let mangaCoverFileName;

        if(mangaID != null)
        {
            const response2 = await fetch(`https://api.mangadex.org/cover?limit=1&manga[]=${mangaID}`);


            if(response2.ok)
            {
                const json_data2 = await response2.json();

                if (json_data2.data.length > 0)
                {
                    mangaCoverFileName = json_data2.data[0].attributes.fileName;
                }
            }
            else
            {
                console.log("Cover ID not found");
            }
        }

        let panel = document.createElement("div");
        let link = document.createElement("a");
        link.href = `manga2.html?mangaTitle=${mangaTitle}&mangaID=${mangaID}&coverFileName=${mangaCoverFileName}&mangaDesc=${mangaDesc}`;
        let cover = document.createElement("img");
        cover.src = `https://uploads.mangadex.org/covers/${mangaID}/${mangaCoverFileName}.256.jpg`;
        let title = document.createElement("h1");
        title.textContent = mangaTitle;

        link.appendChild(cover);
        panel.appendChild(link);
        panel.appendChild(title);

        container.appendChild(panel);
    }
}