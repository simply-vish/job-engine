import { useState } from "react";
import Layout from "../../components/Layout";

function ResumeBuilder() {

  const [data, setData] = useState({
    name: "",
    email: "",
    education: "",
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
        Resume Builder 📄
      </h1>

      <div style={{ maxWidth: "800px", margin: "auto" }}>

        {!show ? (

          /* FORM */
          <div style={card}>

            <input name="name" placeholder="Full Name" onChange={handleChange} style={input} />
            <input name="email" placeholder="Email" onChange={handleChange} style={input} />
            <input name="education" placeholder="Education" onChange={handleChange} style={input} />
            <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} style={input} />
            
            <textarea
              name="projects"
              placeholder="Projects"
              onChange={handleChange}
              style={textarea}
            />

            <button style={button} onClick={() => setShow(true)}>
              Generate Resume
            </button>

          </div>

        ) : (

          /* RESUME PREVIEW */
          <div style={resumeCard}>

            {/* HEADER */}
            <div style={header}>
              <h1 style={{ margin: 0 }}>{data.name}</h1>
              <p style={{ margin: 0 }}>{data.email}</p>
            </div>

            {/* BODY */}
            <div style={{ padding: "20px" }}>

              {/* EDUCATION */}
              <Section title="Education">
                {data.education}
              </Section>

              {/* SKILLS */}
              <Section title="Skills">
                <ul>
                  {data.skills.split(",").map((s, i) => (
                    <li key={i}>{s.trim()}</li>
                  ))}
                </ul>
              </Section>

              {/* PROJECTS */}
              <Section title="Projects">
                {data.projects}
              </Section>

              {/* BUTTONS */}
              <div style={{
                marginTop: "20px",
                display: "flex",
                gap: "10px"
              }}>
                <button style={button} onClick={() => setShow(false)}>
                  Edit
                </button>

                <button style={buttonSecondary} onClick={() => window.print()}>
                  Download PDF
                </button>
              </div>

            </div>

          </div>

        )}

      </div>

    </Layout>
  );
}

/* SECTION COMPONENT */
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={{
        borderBottom: "1px solid #ccc",
        paddingBottom: "5px"
      }}>
        {title}
      </h3>
      <div style={{ marginTop: "10px" }}>
        {children}
      </div>
    </div>
  );
}

/* STYLES */
const card = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
};

const resumeCard = {
  background: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
};

const header = {
  background: "#4f46e5",
  color: "white",
  padding: "20px"
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

export default ResumeBuilder;