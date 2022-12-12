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
    const response = await fetch("/api/generateemoji", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phrase: phraseInput }),
    });
    const data = await response.json();
    setIsLoading(false);
    setResult(data.result);
    setPhraseInput("");
  }

  return (
    <div>
      <Head>
        <title>Translate to emoji</title>
        <link rel="icon" href="/emoji.png" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.icon}>🔠😄</h2>
        <h3>Translate to emoji</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="phrase"
            placeholder="Enter a phrase"
            value={phraseInput}
            onChange={(e) => setPhraseInput(e.target.value)}
          />
          <input type="submit" value={isLoading ? 'Loading...' : 'Generate Emoji translation'} />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
