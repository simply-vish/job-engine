import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

function Reviews() {

  const [reviews, setReviews] = useState([]);
  const [company, setCompany] = useState("");
  const [review, setReview] = useState("");

  const fetchReviews = async () => {
    const snapshot = await getDocs(collection(db, "reviews"));

    const data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async () => {
    if (!company || !review) return;

    await addDoc(collection(db, "reviews"), {
      company,
      review
    });

    setCompany("");
    setReview("");
    fetchReviews();
  };

  return (
    <Layout>

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Work Culture Reviews 🏢
      </h1>

      <div style={{ maxWidth: "800px", margin: "auto" }}>

        {/* ADD REVIEW */}
        <div style={card}>

          <h3 style={{ marginBottom: "10px" }}>Add Review</h3>

          <input
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            style={input}
          />

          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={textarea}
          />

          <button style={button} onClick={handleSubmit}>
            Submit Review
          </button>

        </div>

        {/* REVIEWS LIST */}
        <div style={{ marginTop: "30px" }}>

          <h3 style={{ marginBottom: "15px" }}>All Reviews</h3>

          {reviews.length === 0 && (
            <p style={{ textAlign: "center" }}>No reviews yet</p>
          )}

          {reviews.map((r, index) => (
            <div key={index} style={reviewCard}>

              <h4 style={{ marginBottom: "5px" }}>
                {r.company}
              </h4>

              <p style={{ color: "#555", margin: 0 }}>
                {r.review}
              </p>

            </div>
          ))}

        </div>

      </div>

    </Layout>
  );
}

/* STYLES */
const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
};

const reviewCard = {
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
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

export default Reviews;