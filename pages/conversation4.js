import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([{ role: "system", content: "You are a helpful assistant." }]);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const newConversation = [...conversation, { role: "user", content: userInput }];
    const response = await fetch("/api/conversation4", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: newConversation }),
    });
    const data = await response.json();
    setIsLoading(false);
    setConversation([...newConversation, { role: "assistant", content: data.result }]);
    setUserInput("");
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
          <div className={styles.conversationWindow}>
            {conversation.map((msg, index) => (
                <p key={index}>
                  <strong>{msg.role === "user" ? "User" : "Assistant"}:</strong> {msg.content}
                </p>
            ))}
          </div>
          <form onSubmit={onSubmit}>
            <input
                type="text"
                name="userInput"
                placeholder="Enter a message"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />
            <input
                type="submit"
                value={isLoading ? "Loading..." : "Send message"}
            />
          </form>
        </main>
      </div>
  );
}

