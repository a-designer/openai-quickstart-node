import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [phraseInput, setPhraseInput] = useState("");
  const [idInput, setIdInput] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/conversation4", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phrase: phraseInput}),
    });
    const data = await response.json();
    setIsLoading(false);
    setResult(data.result);
    setPhraseInput(phraseInput + '\nA:' + data.result + '\nQ:')
    //setPhraseInput("");
  }

  return (
    <div>
      <Head>
        <title>General prompt</title>
        <link rel="icon" href="/emoji.png" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.icon}>🤔❓🤖</h2>
        <h3>Have a conversation</h3>
        <form onSubmit={onSubmit}>
          <textarea rows={8}
                    cols={100}

            name="phrase"
            placeholder="Enter a prompt"
            value={phraseInput}
            onChange={(e) => setPhraseInput(e.target.value)}
          />
          <input type="submit" value={isLoading ? 'Loading...' : 'Get response'} />


        </form>
        <p>
          {result}
        </p>
        <textarea
            name="postContent"
            defaultValue={result}
            rows={8}
            cols={100}
        />
      </main>
    </div>
  );
}
