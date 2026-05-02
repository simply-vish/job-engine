import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <Layout>
      {/* HEADER */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "600" }}>
          Welcome back, {userData?.name || "User"} 👋
        </h1>
        <p style={{ color: "#6b7280" }}>
          Track your progress and explore opportunities
        </p>
      </div>

      {/* STATS */}
      <div style={grid3}>
        <StatCard title="Applications" value="12" onClick={() => navigate("/applications")} />
        <StatCard title="Interviews" value="5" />
        <StatCard title="Offers" value="3" />
      </div>

      {/* EXPLORE */}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ marginBottom: "16px" }}>Explore Opportunities</h2>

        <div style={grid2}>
          <JobCard text="Campus Placements" path="/jobs?category=campus" />
          <JobCard text="Internships" path="/jobs?category=internship" />
          <JobCard text="Remote Jobs" path="/jobs?category=remote" />
          <JobCard text="Off-Campus Jobs" path="/jobs?category=offcampus" />
          <JobCard text="Government Exams" path="/jobs?category=government" />
          <JobCard text="Preparation Tools" path="/prep" />
        </div>
      </div>
    </Layout>
  );
}

/* ✅ STAT CARD */
function StatCard({ title, value, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "linear-gradient(135deg, #6366f1, #4f46e5)",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(99,102,241,0.3)",
        cursor: "pointer",
      }}
    >
      <h2 style={{ margin: 0 }}>{value}</h2>
      <p style={{ margin: 0 }}>{title}</p>
    </div>
  );
}

/* ✅ JOB CARD */
function JobCard({ text, path }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      style={{
        background: "#fff",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        cursor: "pointer",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {text}
    </div>
  );
}

/* GRID SYSTEM */
const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
};

export default Dashboard;