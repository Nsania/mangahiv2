//library for various function to be used in my manga reader
export async function getSuggestions(searchContent)
{
    let resultsContainer = document.getElementById("results");

    while(resultsContainer.firstChild)
    {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }

    if(searchContent.trim() != '')
    {
        let response = await fetch(`https://api.mangadex.org/manga?limit=5&offset=0&title=${searchContent}`);



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
                    let mangaCoverID = json_data.data[i].relationships[2].id;

                    if(mangaCoverID != null)
                    {
                        let response2 = await fetch(`https://api.mangadex.org/cover/${mangaCoverID}`);

                        if(response2.ok)
                        {
                            let json_data2 = await response2.json();

                            if(json_data2 != null)
                            {
                                const coverFileName = json_data2.data.attributes.fileName;

                                let panel = document.createElement("img");
                                panel.src = `https://uploads.mangadex.org/covers/${mangaID}/${coverFileName}.256.jpg`;
                                resultsContainer.appendChild(panel);
                            }
                        }

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

export async function getChapters(mangaID)
{
    const response = await fetch(`https://api.mangadex.org/manga/${mangaID}/feed?limit=100&translatedLanguage%5B%5D=en&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&includeFutureUpdates=1&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5BpublishAt%5D=asc&order%5BreadableAt%5D=asc&order%5Bvolume%5D=asc&order%5Bchapter%5D=asc&includeEmptyPages=0`);

    if(response.ok)
    {
        const json_data = await response.json();

        if(json_data.data != null)
        {
            let chapterList = document.getElementById("chapterList");
            let chapters = {};

            console.log(json_data.data.length);

            for(let i = 0; i < json_data.data.length; i++)
            {
                console.log(json_data.data[i].id);
                console.log(json_data.data[i].attributes.chapter);
                console.log(json_data.data[i].attributes.title);

                chapters[i] = {chapterID: json_data.data[i].id, chapterNum: json_data.data[i].attributes.chapter, chapterTitle: json_data.data[i].attributes.title};
            }

            console.log(chapters[0].chapterTitle);

            for(let j = 0; j < json_data.data.length; j++)
            {
                let chapter = document.createElement("a");
                chapter.href = `reader.html?mangaChapterID=${chapters[j].chapterID}`;
                chapter.textContent = `Chapter ${chapters[j].chapterNum}: ${chapters[j].chapterTitle}`;

                chapterList.appendChild(chapter);
            }

        }
        else
        {
            console.log("JSON empty");
        }
    }
    else
    {
        console.log("Error in API request");
    }
}

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
