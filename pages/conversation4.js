import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [systemMessage, setSystemMessage] = useState("You are a helpful assistant.");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [extraSmart, setExtraSmart] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const newConversation = [...conversation, { role: "user", content: userInput }];
    const response = await fetch("/api/conversation4", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "system", content: systemMessage }, ...newConversation],
        model: extraSmart ? 2 : 1,
      }),
    });
    const data = await response.json();
    setIsLoading(false);
    setConversation([...newConversation, { role: "assistant", content: data.result }]);
    setUserInput("");
  }

  async function saveConversation() {
    await fetch("/api/save-conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conversation),
    });
  }

  function handleKeyPress(event) {
    if (event.key === "Enter" && event.metaKey) {
      onSubmit(event);
    }
  }

  return (
      <div>
        <Head>
          <title>General prompt</title>
          <link rel="icon" href="/emoji.png" />
        </Head>

        <main className={styles.main}>
          <h2 className={styles.icon}>🤔❓🤖</h2>
          <textarea
              className={styles.systemMessage}
              value={systemMessage}
              onChange={(e) => setSystemMessage(e.target.value)}
          />
          <div className={styles.conversationWindow}>
            {conversation.map((msg, index) => (
                <p key={index}>
                  <strong>{msg.role === "user" ? "User" : "Assistant"}:</strong> {msg.content}
                </p>
            ))}
          </div>
          <form onSubmit={onSubmit} className={styles.form}>
          <textarea
              rows="3"
              name="userInput"
              placeholder="Enter a message"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.messageInput}
          />
            <input
                type="submit"
                value={isLoading ? "Loading..." : "Send message"}
                className={styles.submitButton}
            />
            <label htmlFor="extraSmart" className={styles.extraSmartLabel}>
              <input
                  type="checkbox"
                  id="extraSmart"
                  checked={extraSmart}
                  onChange={() => setExtraSmart(!extraSmart)}
              />
              Extra Smart
            </label>
          </form>
          <button onClick={saveConversation} className={styles.saveButton}>
            Save conversation
          </button>
        </main>
      </div>
  );
}