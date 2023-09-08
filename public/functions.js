//library for various function to be used in my manga reader

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

                //below code will handle getting the cover file name
                try
                {
                    const response = await fetch(`https://api.mangadex.org/cover/${encodeURIComponent(mangaCoverID)}`);

                    if(response.ok)
                    {
                        const json_data = await response.json();

                        if(json_data.data != null)
                        {
                            const CoverFileName = json_data.data.attributes.fileName;

                            console.log(`CoverFileName: ${CoverFileName}`);

                            cover_container.src = `https://uploads.mangadex.org/covers/${mangaID}/${CoverFileName}.256.jpg`;
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
    const response = await fetch(`https://api.mangadex.org/manga/${mangaID}/feed`);

    if(response.ok)
    {
        const jsonData = await response.json();
    }
}
