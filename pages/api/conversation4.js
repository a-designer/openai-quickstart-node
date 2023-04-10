import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const messages = req.body.messages;
  const model = req.body.model;

  let openaiModel;
  if (model === 1) {
    openaiModel = "gpt-3.5-turbo";
  } else if (model === 2) {
    openaiModel = "gpt-4";
  } else {
    res.status(400).json({ error: "Invalid model value" });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: openaiModel,
      temperature: 0.7,
      max_tokens: 2000,
      messages: messages,
    });

    res.status(200).json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
}