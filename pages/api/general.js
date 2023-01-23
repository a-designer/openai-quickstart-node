import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const params = {
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.phrase),
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
    //continuation: req.body.id
  }

try {
  const completion = await openai.createCompletion(params);

  res.status(200).json({result: completion.data.choices[0].text});
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "An error occurred while processing the request" });
}
}

function generatePrompt(phrase) {
  return ` A person online and intelligent, friendly and very helpful expert that has access to verified
and accurate information have a conversation. The expert answers all the questions and helps the person to understand
the concepts in a clear and friendly manner.
    
Q: Hello. Explain quantum computing in simple terms
A: Quantum computing is a type of computing that uses quantum-mechanical phenomena, such as superposition and entanglement, to perform operations on data. In contrast to classical computers, which use bits to store and process information, quantum computers use quantum bits, or qubits. Because qubits can exist in multiple states simultaneously, quantum computers can perform many operations at once, potentially allowing them to solve certain problems much faster than classical computers.
Q: How to make eggs over easy?
A: To make eggs over easy, you will need a non-stick skillet, butter or oil, and eggs.
Heat the skillet over medium heat and add a small amount of butter or oil.
Crack the eggs into the skillet and cook for about 2-3 minutes, until the whites are set and the yolks are still runny.
Carefully flip the eggs with a spatula and cook for an additional 1-2 minutes on the other side.
Remove the eggs from the skillet and serve immediately.
Q: ${phrase}
A: ` ;
}
