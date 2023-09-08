const search_button = document.getElementById("search_button"); //search button
const search_bar = document.getElementById("search"); //search field
const cover_container = document.getElementById("cover"); //cover
let title; //variable to hold what user searches for

//add an eventListener for when the search button is pressed
search_button.addEventListener("click", function()
{
    //assisgns value in the field to "title" variable
    title = search_bar.value;
    //executes searchManga() function
    searchManga();
});

async function searchManga()
{
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

                console.log(`Mange: ${title}`)
                console.log(`MangaID: ${mangaID}`);
                console.log(`CoverID: ${mangaCoverID}`);

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
            console.error("Error in API request.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}