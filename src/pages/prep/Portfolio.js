import { useState } from "react";
import Layout from "../../components/Layout";

function Portfolio() {

  const [data, setData] = useState({
    name: "",
    title: "",
    skills: "",
    projects: ""
  });

  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Layout>

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Portfolio Builder 🌐
      </h1>

      {/* CENTER CONTAINER */}
      <div style={{ maxWidth: "800px", margin: "auto" }}>

        {!show ? (

          /* FORM */
          <div style={card}>

            <input
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              style={input}
            />

            <input
              name="title"
              placeholder="Your Role (e.g. Web Developer)"
              onChange={handleChange}
              style={input}
            />

            <input
              name="skills"
              placeholder="Skills (comma separated)"
              onChange={handleChange}
              style={input}
            />

            <textarea
              name="projects"
              placeholder="Projects"
              onChange={handleChange}
              style={textarea}
            />

            <button style={button} onClick={() => setShow(true)}>
              Generate Portfolio
            </button>

          </div>

        ) : (

          /* PORTFOLIO PREVIEW */
          <div style={portfolioCard}>

            {/* HEADER */}
            <div style={header}>
              <h1>{data.name}</h1>
              <p>{data.title}</p>
            </div>

            {/* CONTENT */}
            <div style={{ padding: "20px" }}>

              {/* SKILLS */}
              <h3>Skills</h3>
              <div style={skillsContainer}>
                {data.skills.split(",").map((skill, i) => (
                  <span key={i} style={skillTag}>
                    {skill.trim()}
                  </span>
                ))}
              </div>

              {/* PROJECTS */}
              <h3 style={{ marginTop: "20px" }}>Projects</h3>
              <p style={{ color: "#555" }}>{data.projects}</p>

              {/* BUTTONS */}
              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button style={button} onClick={() => setShow(false)}>
                  Edit
                </button>

                <button style={buttonSecondary} onClick={() => window.print()}>
                  Download
                </button>
              </div>

            </div>

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

const portfolioCard = {
  background: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
};

const header = {
  background: "#4f46e5",
  color: "white",
  padding: "30px",
  textAlign: "center"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const textarea = {
  width: "100%",
  height: "100px",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const button = {
  padding: "12px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const buttonSecondary = {
  padding: "12px",
  background: "#e5e7eb",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const skillsContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "10px"
};

const skillTag = {
  background: "#e0e7ff",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "14px"
};

export default Portfolio;