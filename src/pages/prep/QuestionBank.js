import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function QuestionBank() {

  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("HR");

  useEffect(() => {
    const fetchQuestions = async () => {

      const snapshot = await getDocs(collection(db, "questions"));
      const data = [];

      snapshot.forEach((doc) => {
        const q = doc.data();
        if (q.category === filter) {
          data.push(q);
        }
      });

      setQuestions(data);
    };

    fetchQuestions();
  }, [filter]);

  return (
    <Layout>

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Interview Question Bank 🎯
      </h1>

      {/* FILTER BUTTONS */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "30px"
      }}>

        <button
          style={filter === "HR" ? activeBtn : btn}
          onClick={() => setFilter("HR")}
        >
          HR
        </button>

        <button
          style={filter === "Technical" ? activeBtn : btn}
          onClick={() => setFilter("Technical")}
        >
          Technical
        </button>

      </div>

      {/* CENTER CONTAINER */}
      <div style={{
        maxWidth: "800px",
        margin: "auto"
      }}>

        {questions.length === 0 && (
          <p style={{ textAlign: "center" }}>No questions available</p>
        )}

        {questions.map((q, index) => (
          <div key={index} style={card}>

            <h3 style={{ marginBottom: "10px" }}>
              {q.question}
            </h3>

            <textarea
              placeholder="Write your answer..."
              style={textarea}
            />

          </div>
        ))}

      </div>

    </Layout>
  );
}

/* STYLES */
const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "15px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
};

const textarea = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginTop: "10px"
};

const btn = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#e5e7eb",
  cursor: "pointer"
};

const activeBtn = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#4f46e5",
  color: "white",
  cursor: "pointer"
};

export default QuestionBank;