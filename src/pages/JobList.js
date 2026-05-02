import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));

      const jobArray = [];

      querySnapshot.forEach((doc) => {
        const jobData = doc.data();

        if (jobData.category === category) {
          jobArray.push({ id: doc.id, ...jobData });
        }
      });

      setJobs(jobArray);
    };

    fetchJobs();
  }, [category]);

  return (
    <Layout>
      <div className="card">
        <h2>Jobs</h2>

        {jobs.length === 0 && <p>No jobs found</p>}

        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #e5e7eb",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              background: "#fff",
            }}
          >
            <h3>{job.title}</h3>

            <p>
              <b>Company:</b> {job.company}
            </p>

            <p>
              <b>Location:</b> {job.location}
            </p>

            <p>
              <b>Salary:</b> {job.salary}
            </p>

            <button
              style={{
                padding: "8px 16px",
                background: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={() => navigate(`/job/${job.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default JobList;
