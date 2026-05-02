import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Layout from "../../components/Layout";

function GDTopics() {

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const snapshot = await getDocs(collection(db, "gd_topics"));

      const data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setTopics(data);
    };

    fetchTopics();
  }, []);

  return (
    <Layout>

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        GD Topics 💬
      </h1>

      {/* CENTER WRAPPER */}
      <div style={{
        maxWidth: "700px",
        margin: "auto"
      }}>

        {topics.length === 0 && (
          <p style={{ textAlign: "center" }}>No topics available</p>
        )}

        {topics.map((topic, index) => (
          <div key={index} style={card}>
            <h3 style={{ marginBottom: "10px" }}>
              {topic.title || topic.topic}
            </h3>

            {topic.description && (
              <p style={{ color: "#666" }}>
                {topic.description}
              </p>
            )}
          </div>
        ))}

      </div>

    </Layout>
  );
}

/* STYLE */
const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "15px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
};

export default GDTopics;