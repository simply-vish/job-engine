import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function PreparationTools() {
  const navigate = useNavigate();

  return (
    <Layout>

      {/* HEADER */}
      <div style={header}>
        <h1 style={title}>Preparation Tools 🚀</h1>
        <p style={subtitle}>
          Everything you need to prepare, practice, and succeed
        </p>
      </div>

      {/* DOCUMENT TOOLS */}
      <Section title="📄 Document Tools">
        <Grid>
          <ToolCard text="Resume Builder" color="#6366f1" onClick={() => navigate("/resume")} />
          <ToolCard text="Cover Letter" color="#8b5cf6" onClick={() => navigate("/cover-letter")} />
          <ToolCard text="Portfolio" color="#06b6d4" onClick={() => navigate("/portfolio")} />
        </Grid>
      </Section>

      {/* INTERVIEW */}
      <Section title="🎯 Interview Preparation">
        <Grid>
          <ToolCard text="HR Questions" color="#10b981" onClick={() => navigate("/questions")} />
          <ToolCard text="GD Topics" color="#f59e0b" onClick={() => navigate("/gd")} />
          <ToolCard text="Mock Interview" color="#ef4444" onClick={() => navigate("/mock")} />
        </Grid>
      </Section>

      {/* COMPANY */}
      <Section title="🏢 Company Insights">
        <Grid>
          <ToolCard text="Salary Insights" color="#3b82f6" onClick={() => navigate("/salary")} />
          <ToolCard text="Work Culture" color="#14b8a6" onClick={() => navigate("/reviews")} />
          <ToolCard text="Offer Evaluator" color="#9333ea" onClick={() => navigate("/offer")} />
        </Grid>
      </Section>

    </Layout>
  );
}

/* ================= COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2 style={sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return (
    <div style={grid}>
      {children}
    </div>
  );
}

function ToolCard({ text, color, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        ...card,
        borderTop: `4px solid ${color}`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
      }}
    >
      <span style={{ fontWeight: "500" }}>{text}</span>
    </div>
  );
}

/* ================= STYLES ================= */

const header = {
  marginBottom: "30px"
};

const title = {
  fontSize: "26px",
  fontWeight: "600",
  marginBottom: "6px"
};

const subtitle = {
  fontSize: "14px",
  color: "#6b7280"
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "12px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px"
};

const card = {
  background: "#ffffff",
  padding: "18px",
  borderRadius: "12px",
  cursor: "pointer",
  textAlign: "center",
  transition: "all 0.2s ease",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
};

export default PreparationTools;