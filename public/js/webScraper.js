const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://anilist.co/search/manga/trending';

axios.get(url).then((response) => {
    if(response.status === 200)
    {
        const $ = cheerio.load(response.data);
        export const mangaTitle = [];

        $('a.title').each(function()
        {
            mangaTitle.push($(this).text());
        });

        for(const title of mangaTitle)
        {
            console.log(title);
        }
    }
    else
    {
        console.log("Couldn't retrieve titles");
    }
}).catch((error) => {
    console.error(error);
});
