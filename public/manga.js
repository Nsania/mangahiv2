const mangaTitle = "Aishiteru Game wo Owarasetai"; // Replace with the title of the manga you're interested in

// Create a function to search for manga and retrieve the manga ID
async function getMangaID() {
    try {
        // Make a GET request to the MangaDex API search endpoint
        const response = await fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(mangaTitle)}`);

        // Check if the request was successful (status code 200)
        if (response.ok) {
            const data = await response.json();

            // Check if the data contains results
            if (data.data.length > 0) {
                const mangaID = data.data[0].id;
                console.log(`Manga ID for '${mangaTitle}': ${mangaID}`);
            } else {
                console.log("Manga not found.");
            }
        } else {
            console.error("Error in API request.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Call the function to retrieve the manga ID
getMangaID();
