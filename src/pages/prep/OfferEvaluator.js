import { useState } from "react";
import Layout from "../../components/Layout";

function OfferEvaluator() {

  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState(null);

  const evaluateOffer = () => {
    const sal = Number(salary);

    let message = "";
    let color = "";

    if (location.toLowerCase() === "bangalore" || location.toLowerCase() === "gurgaon") {
      if (sal >= 10) {
        message = "Excellent Offer 🚀";
        color = "#10b981";
      } else if (sal >= 6) {
        message = "Average Offer ⚖️";
        color = "#f59e0b";
      } else {
        message = "Low Offer ⚠️";
        color = "#ef4444";
      }
    } else {
      if (sal >= 7) {
        message = "Good Offer 👍";
        color = "#10b981";
      } else if (sal >= 4) {
        message = "Average Offer ⚖️";
        color = "#f59e0b";
      } else {
        message = "Low Offer ⚠️";
        color = "#ef4444";
      }
    }

    setResult({ message, color });
  };

  return (
    <Layout>

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Offer Evaluator 💼
      </h1>

      {/* CENTER CONTAINER */}
      <div style={{
        maxWidth: "500px",
        margin: "auto"
      }}>

        {/* INPUT CARD */}
        <div style={card}>

          <input
            type="number"
            placeholder="Salary (LPA)"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            style={input}
          />

          <input
            placeholder="Location (e.g. Bangalore)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={input}
          />

          <button style={button} onClick={evaluateOffer}>
            Evaluate Offer
          </button>

        </div>

        {/* RESULT */}
        {result && (
          <div style={{
            ...card,
            marginTop: "20px",
            background: result.color,
            color: "white",
            textAlign: "center"
          }}>
            <h2>{result.message}</h2>
          </div>
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
  boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const button = {
  width: "100%",
  padding: "12px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default OfferEvaluator;