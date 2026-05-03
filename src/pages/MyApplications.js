import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function MyApplications() {
  // const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState("all");
  // const [applications, setApplications] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "applications"),
        where("userId", "==", user.uid),
      );

      const snapshot = await getDocs(q);

      const apps = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setApplications(apps);
      setLoading(false);
    };

    fetchApplications();
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
        {loading ? (
          <p>Loading...</p>
        ) : filteredApps.length === 0 ? (
          <p style={{ color: "#6b7280", marginTop: "20px" }}>
            No applications found 🚀
          </p>
        ) : (
          filteredApps.map((app) => (
            <div key={app.id} style={cardStyle}>
              <div>
                <h3>{app.jobTitle}</h3>
                <p>{app.company}</p>
              </div>

              <span style={badgeStyle}>{app.status}</span>
            </div>
          ))
        )}
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

// function Status({ status }) {
//   const colors = {
//     applied: "#3b82f6",
//     interview: "#f59e0b",
//     offer: "#10b981",
//     rejected: "#ef4444",
//   };

//   return (
//     <span
//       style={{
//         background: colors[status] || "#ccc",
//         color: "white",
//         padding: "4px 10px",
//         borderRadius: "20px",
//         fontSize: "12px",
//       }}
//     >
//       {status}
//     </span>
//   );
// }

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

// const card = {
//   background: "#fff",
//   padding: "16px",
//   borderRadius: "10px",
//   border: "1px solid #eee",
//   boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
// };

// const muted = {
//   color: "#6b7280",
// };

const cardStyle = {
  background: "#fff",
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  marginBottom: "12px",
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

export default MyApplications;
