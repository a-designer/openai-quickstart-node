import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [phraseInput, setPhraseInput] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/general", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phrase: phraseInput }),
    });
    const data = await response.json();
    setIsLoading(false);
    setResult(data.result);
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
        <h3>Ask robots anything</h3>
        <form onSubmit={onSubmit}>
          <textarea

            name="phrase"
            placeholder="Enter a prompt"
            value={phraseInput}
            onChange={(e) => setPhraseInput(e.target.value)}
          />
          <input type="submit" value={isLoading ? 'Loading...' : 'Get response'} />


        </form>
        <div className={styles.generalResult}>{result}</div>
      </main>
    </div>
  );
}
