import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, "applications"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []); // clean, no warning

  // FILTER LOGIC
  const filteredApps =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status === filter);

  return (
    <Layout>
      {/* HEADER */}
      <div style={header}>
        <h1>My Applications</h1>
        <p style={subText}>Track your job applications</p>
      </div>

      {/* FILTER */}
      <div style={filters}>
        <FilterBtn text="All" active={filter === "all"} onClick={() => setFilter("all")} />
        <FilterBtn text="Applied" active={filter === "applied"} onClick={() => setFilter("applied")} />
        <FilterBtn text="Interview" active={filter === "interview"} onClick={() => setFilter("interview")} />
      </div>

      {/* CONTENT */}
      <div style={grid}>
        {loading ? (
          <p>Loading...</p>
        ) : filteredApps.length === 0 ? (
          <p style={emptyText}>No applications yet 🚀</p>
        ) : (
          filteredApps.map((app) => (
            <div key={app.id} style={cardStyle}>
              <div>
                <h3 style={{ margin: 0 }}>{app.jobTitle || "Job Title"}</h3>
                <p style={subText}>{app.company || "Company"}</p>
              </div>

              <span style={badgeStyle}>{app.status || "applied"}</span>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

/* FILTER BUTTON */
function FilterBtn({ text, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        background: active ? "#6366f1" : "#e5e7eb",
        color: active ? "white" : "#111",
        fontWeight: "500",
      }}
    >
      {text}
    </button>
  );
}

/* STYLES */

const header = {
  marginBottom: "20px",
};

const subText = {
  color: "#6b7280",
  fontSize: "14px",
};

const filters = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "16px",
};

const cardStyle = {
  background: "#fff",
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const badgeStyle = {
  background: "#6366f1",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "500",
  textTransform: "capitalize",
};

const emptyText = {
  color: "#6b7280",
  marginTop: "20px",
};

export default MyApplications;