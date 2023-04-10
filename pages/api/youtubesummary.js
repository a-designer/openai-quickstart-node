import { Configuration, OpenAIApi } from "openai";

import{ google } from "googleapis"

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY
});
youtube.captions.list({
    videoId: 'VIDEO_ID',
    part: 'id,snippet'
}, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    let captions = res;
    // Do something with the captions
});


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {


    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(req.body.phrase),
        temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(phrase) {
    const capitalizedPhrase =
        phrase[0].toUpperCase() + phrase.slice(1).toLowerCase();
    return `transform the phrase into emojis

I love apples: ❤️🍎
Dog walks in a park : 🐶🚶🏞️
Party had great music : 🎉 🎼🎧️ ❤️
${capitalizedPhrase} :`;
}
