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
                        suggestion_link.href = `manga2.html?mangaTitle=${mangaTitle}&mangaID=${mangaID}`;

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
export async function searchManga(title, cover_container)
{
    //const cover_container = document.getElementById("cover"); //cover

    //tries the block of code inside
    try {
        // Make a GET request to the MangaDex API search endpoint
        const response = await fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(title)}`);

        // Check if the request was successful (status code 200)
        if (response.ok)
        {
            const json_data = await response.json();

            // Check if the data contains results
            if (json_data.data.length > 0)
            {
                //here we store the manga and cover id
                const mangaID = json_data.data[0].id;
                const mangaCoverID = json_data.data[0].relationships[2].id;
                const mangaTitle = json_data.data[0].attributes.title.en;

                console.log(`Manga: ${title}`)
                console.log(`MangaID: ${mangaID}`);
                console.log(`CoverID: ${mangaCoverID}`);
                console.log(`MangaTitle: ${mangaTitle}`);

                localStorage.setItem("mangaTitle", mangaTitle);
                localStorage.setItem("mangaID", mangaID);

                //below code will handle getting the cover file name
                try
                {
                    const response = await fetch(`https://api.mangadex.org/cover/${mangaCoverID}`);

                    if(response.ok)
                    {
                        const json_data = await response.json();

                        if(json_data.data != null)
                        {
                            const coverFileName = json_data.data.attributes.fileName;

                            console.log(`CoverFileName: ${coverFileName}`);

                            cover_container.src = `https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}.256.jpg`;
                        }
                        else
                        {
                            console.log("Cover not found")
                        }
                    }
                    else
                    {
                        console.error("Error in API request.");
                    }
                }
                catch(error)
                {
                    console.error("An error occurred: ", error);
                }

            }
            else
            {
                console.log("Manga not found.");
            }
        }
        else
        {
            console.error("Error in API request.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


//method will get manga feed (all chapters available)
export async function getChapters(mangaID)
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
        let chaptersIndex = 0;
        let chaptersLength = 0;

        while(i < requests)
        {
            const response2 = await fetch(`https://api.mangadex.org/manga/${mangaID}/feed?limit=100&offset=${offset}&translatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&includeFutureUpdates=1&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5BpublishAt%5D=asc&order%5BreadableAt%5D=asc&order%5Bvolume%5D=asc&order%5Bchapter%5D=asc`);

            if(response2.ok)
            {
                const json_data2 = await response2.json();

                if(json_data2.data != null)
                {
                    for(let i = 0; i < json_data2.data.length; i++)
                    {
                        console.log(json_data2.data[i].id);
                        console.log(json_data2.data[i].attributes.chapter);
                        console.log(json_data2.data[i].attributes.title);

                        //chapters[i + chaptersIndex] = {chapterID: json_data2.data[i].id, chapterNum: json_data2.data[i].attributes.chapter, chapterTitle: json_data2.data[i].attributes.title};
                        chaptersArray.push({chapterID: json_data2.data[i].id, chapterNum: json_data2.data[i].attributes.chapter, chapterTitle: json_data2.data[i].attributes.title});
                        chaptersLength++;
                    }
                }
                else
                {
                    console.log("JSON empty");
                }
            }

            chaptersIndex = chaptersLength;
            i++;
            offset+=100;
        }

        chaptersArray = chaptersArray.sort(function(a,b){return b.chapterNum - a.chapterNum});


        chaptersArray.forEach(function(element)
        {
            let chapter = document.createElement("a");
            chapter.href = `reader.html?mangaChapterID=${element.chapterID}`;
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
