import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function MyApplications() {
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchApps = async () => {
      const snapshot = await getDocs(collection(db, "applications"));

      const arr = [];
      snapshot.forEach((doc) => {
        arr.push(doc.data());
      });

      setApps(arr);
    };

    fetchApps();
  }, []);

  const filteredApps =
    filter === "all" ? apps : apps.filter((a) => a.status === filter);

  return (
    <Layout>
      {/* HEADER */}
      <div style={header}>
        <h1>My Applications</h1>
        <p style={{ color: "#6b7280" }}>Track your job applications</p>
      </div>

      {/* FILTER */}
      <div style={filters}>
        <FilterBtn
          text="All"
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <FilterBtn
          text="Applied"
          active={filter === "applied"}
          onClick={() => setFilter("applied")}
        />
        <FilterBtn
          text="Interview"
          active={filter === "interview"}
          onClick={() => setFilter("interview")}
        />
      </div>

      {/* GRID */}
      <div style={grid}>
        {filteredApps.length === 0 && <p>No applications found</p>}

        {filteredApps.map((app, i) => (
          <div key={i} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{app.jobTitle || app.title}</h3>
              <Status status={app.status} />
            </div>

            <p style={muted}>{app.companyName || app.company}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

/* COMPONENTS */

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
        color: active ? "white" : "black",
      }}
    >
      {text}
    </button>
  );
}

function Status({ status }) {
  const colors = {
    applied: "#3b82f6",
    interview: "#f59e0b",
    offer: "#10b981",
    rejected: "#ef4444",
  };

  return (
    <span
      style={{
        background: colors[status] || "#ccc",
        color: "white",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
      }}
    >
      {status}
    </span>
  );
}

/* STYLES */

const header = {
  marginBottom: "20px",
};

const filters = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "15px",
};

const card = {
  background: "#fff",
  padding: "16px",
  borderRadius: "10px",
  border: "1px solid #eee",
  boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
};

const muted = {
  color: "#6b7280",
};

export default MyApplications;
