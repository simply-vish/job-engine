import { useState } from "react";
import Layout from "../../components/Layout";

function CoverLetter() {

  const [data, setData] = useState({
    name: "",
    company: "",
    role: "",
    skills: ""
  });

  const [letter, setLetter] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const generateLetter = () => {
    const text = `
Dear Hiring Manager,

I am ${data.name}, applying for the role of ${data.role} at ${data.company}.
I have strong skills in ${data.skills} and I am eager to contribute to your team.

Thank you for your time and consideration.

Sincerely,
${data.name}
    `;
    setLetter(text);
  };

  return (
    <Layout>

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Cover Letter Generator ✉️
      </h1>

      {/* CENTER CONTAINER */}
      <div style={{
        maxWidth: "700px",
        margin: "auto"
      }}>

        {/* FORM */}
        <div style={card}>

          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            style={input}
          />

          <input
            name="company"
            placeholder="Company Name"
            onChange={handleChange}
            style={input}
          />

          <input
            name="role"
            placeholder="Role"
            onChange={handleChange}
            style={input}
          />

          <input
            name="skills"
            placeholder="Your Skills"
            onChange={handleChange}
            style={input}
          />

          <button style={button} onClick={generateLetter}>
            Generate Letter
          </button>

        </div>

        {/* OUTPUT */}
        {letter && (
          <div style={{ ...card, marginTop: "20px" }}>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {letter}
            </pre>
          </div>
        )}

      </div>

    </Layout>
  );
}

/* STYLES */
const card = {
  background: "#fff",
  padding: "25px",
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

export default CoverLetter;