import "./App.css";
import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [explanationStyle, setExplanationStyle] = useState("simple");
  const [highContrast, setHighContrast] = useState(false);
  const [trust, setTrust] = useState(3);
  const [clarity, setClarity] = useState(3);
  const [usefulness, setUsefulness] = useState(3);
  const [feedbackHistory, setFeedbackHistory] = useState([]);

const handleAskAI = async () => {
  if (!question.trim()) return;

  try {
    const res = await fetch("http://127.0.0.1:8000/ask-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        style: explanationStyle,
      }),
    });

    const data = await res.json();

    setResponse(data.response);

  } catch (error) {
    console.error(error);
    setResponse("Error connecting to AI backend.");
  }
};

  const handleSubmitFeedback = () => {
    const newFeedback = {
      question,
      explanationStyle,
      trust,
      clarity,
      usefulness,
    };

    setFeedbackHistory([...feedbackHistory, newFeedback]);
    alert("Feedback submitted successfully!");
  };

  return (
    <main className={highContrast ? "container dark" : "container"}>
      <section className="card">
        <div className="toggle-row">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={highContrast}
              onChange={() => setHighContrast(!highContrast)}
            />
            Enable High Contrast Mode
          </label>
        </div>

        <h1>Human-AI Trust & Accessibility Assistant</h1>

        <p>
          Ask a question, review the AI response, and rate how trustworthy,
          clear, and useful it feels.
        </p>

        <label htmlFor="style">Explanation Style</label>
        <select
          id="style"
          value={explanationStyle}
          onChange={(e) => setExplanationStyle(e.target.value)}
        >
          <option value="simple">Simple</option>
          <option value="detailed">Detailed</option>
          <option value="friendly">Friendly</option>
        </select>

        <label htmlFor="question">Your Question</label>
        <textarea
          id="question"
          placeholder="Ask the AI something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button onClick={handleAskAI}>Ask AI</button>

        {response && (
          <div className="response-box">
            <h3>AI Response</h3>
            <p>{response}</p>

            <div className="feedback-section">
              <h3>Rate Your Experience</h3>

              <label>
                Trust: {trust}/5
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={trust}
                  onChange={(e) => setTrust(e.target.value)}
                />
              </label>

              <label>
                Clarity: {clarity}/5
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={clarity}
                  onChange={(e) => setClarity(e.target.value)}
                />
              </label>

              <label>
                Usefulness: {usefulness}/5
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={usefulness}
                  onChange={(e) => setUsefulness(e.target.value)}
                />
              </label>

              <button onClick={handleSubmitFeedback}>
                Submit Feedback
              </button>
            </div>

            {feedbackHistory.length > 0 && (
              <div className="history-section">
                <h3>Previous Feedback</h3>

                {feedbackHistory.map((item, index) => (
                  <div key={index} className="history-card">
                    <p>
                      <strong>Question:</strong> {item.question}
                    </p>
                    <p>
                      <strong>Style:</strong> {item.explanationStyle}
                    </p>
                    <p>
                      <strong>Trust:</strong> {item.trust}/5
                    </p>
                    <p>
                      <strong>Clarity:</strong> {item.clarity}/5
                    </p>
                    <p>
                      <strong>Usefulness:</strong> {item.usefulness}/5
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;