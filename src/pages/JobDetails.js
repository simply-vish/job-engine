import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      const docRef = doc(db, "jobs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setJob(docSnap.data());
      }
    };

    const checkApplication = async () => {
      const user = auth.currentUser;

      const querySnapshot = await getDocs(collection(db, "applications"));

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.jobId === id && data.studentId === user.uid) {
          setHasApplied(true);
        }
      });
    };

    fetchJob();
    checkApplication();
  }, [id]);

  const applyJob = async () => {
    const user = auth.currentUser;

    if (hasApplied) {
      alert("You already applied for this job");
      return;
    }

    await addDoc(collection(db, "applications"), {
      jobId: id,
      studentId: user.uid,
      status: "applied",
      appliedDate: new Date(),
    });

    setHasApplied(true);
  };

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>{job.title}</h2>

        <p>
          <b>Company:</b> {job.company}
        </p>

        <p>
          <b>Location:</b> {job.location}
        </p>

        <p>
          <b>Salary:</b> {job.salary}
        </p>

        <p>
          <b>Description:</b> {job.description}
        </p>

        <p>
          <b>Minimum CGPA:</b> {job.eligibilityCGPA}
        </p>

        <button
          onClick={applyJob}
          disabled={hasApplied}
          style={{
            padding: "10px 20px",
            background: hasApplied ? "#9ca3af" : "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: hasApplied ? "not-allowed" : "pointer",
          }}
        >
          {hasApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </Layout>
  );
}

export default JobDetails;
