export const Card = ({ children, onClick }) => (
  <div
    onClick={onClick}
    style={card}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
  >
    {children}
  </div>
);

export const Section = ({ title, children }) => (
  <div style={{ marginBottom: "28px" }}>
    <h2 style={sectionTitle}>{title}</h2>
    {children}
  </div>
);

export const Grid = ({ children, cols = 2 }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: "16px"
  }}>
    {children}
  </div>
);

/* STYLES */

const card = {
  background: "#ffffff",
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  cursor: "pointer",
  transition: "all 0.2s ease"
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "12px",
  color: "#111827"
};