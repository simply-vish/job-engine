import { useState } from "react";
import Layout from "../../components/Layout";

const questions = [
  "Tell me about yourself.",
  "Why do you want this job?",
  "What are your strengths?",
  "Describe a challenge you faced.",
  "Where do you see yourself in 5 years?"
];

function MockInterview() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleNext = () => {
    if (!answer) {
      alert("Please answer first");
      return;
    }

    // Basic feedback logic
    if (answer.length < 20) {
      setFeedback("Try to give a more detailed answer.");
    } else {
      setFeedback("Good answer 👍");
    }

    setTimeout(() => {
      setAnswer("");
      setFeedback("");
      setStep((prev) => prev + 1);
    }, 1500);
  };

  return (
    <Layout>
      <h1 style={{ fontSize: "22px", marginBottom: "6px" }}>
        Mock Interview 🎤
      </h1>

      <p style={{ color: "#666", marginBottom: "20px" }}>
        Practice real interview questions
      </p>

      <div style={card}>

        {step < questions.length ? (
          <>
            <h3 style={{ marginBottom: "10px" }}>
              Question {step + 1}
            </h3>

            <p style={{ marginBottom: "15px", fontWeight: "500" }}>
              {questions[step]}
            </p>

            <textarea
              placeholder="Type your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={textarea}
            />

            <button style={btn} onClick={handleNext}>
              Next
            </button>

            {feedback && (
              <p style={{ marginTop: "10px", color: "#10b981" }}>
                {feedback}
              </p>
            )}
          </>
        ) : (
          <h3>🎉 Interview Completed!</h3>
        )}

      </div>
    </Layout>
  );
}

/* STYLES */

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  maxWidth: "600px"
};

const textarea = {
  width: "100%",
  height: "100px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  marginBottom: "10px"
};

const btn = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  background: "#6366f1",
  color: "white",
  cursor: "pointer"
};

export default MockInterview;