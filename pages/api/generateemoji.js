import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
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
