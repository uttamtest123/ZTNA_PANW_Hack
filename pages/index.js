import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
const path = require('path');

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      console.log("After Response");

      if (response.status !== 200) {
        console.log("Error by OPENAPI");

        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      const imageMap = {
        'ZTNA Connector': 'ztna.png',
        'output2': 'colo.png',
        'output3': 'sc.png',
        // add more mappings here as needed
      };

      setResult(imageMap[animalInput.toLowerCase()]);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
       <img src="/sase.png" className={styles.icon} />
       <h3>ZTNA Architecture Design</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter your network requirements"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate Zero Trust Architecture" />
        </form>
        {result && <img src={`/${result}.png`} alt={result} className={styles.icon} />}
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
