import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkHealth() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://hackathon-backend-837697756080.us-central1.run.app/sample",
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);
    } catch {
      setMessage("接続できませんでした");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>ハッカソン接続テスト</h1>
      <button onClick={checkHealth} disabled={loading}>
        {loading ? "取得中…" : "DBのデータを取得"}
      </button>
      <p role="status">{message}</p>
    </main>
  );
}

export default App;
