import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function SalaryInsights() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "salary_data"));

      const arr = [];
      snapshot.forEach((doc) => {
        arr.push(doc.data());
      });

      setData(arr);
    };

    fetchData();
  }, []);

  return (
    <Layout>

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Salary Insights 💰
      </h1>

      {/* CENTER CONTAINER */}
      <div style={{
        maxWidth: "800px",
        margin: "auto"
      }}>

        {data.length === 0 && (
          <p style={{ textAlign: "center" }}>No data available</p>
        )}

        {data.map((item, index) => (
          <div key={index} style={card}>

            {/* TOP ROW */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>

              <div>
                <h3 style={{ margin: 0 }}>{item.company}</h3>
                <p style={{ color: "#666", margin: 0 }}>
                  {item.role}
                </p>
              </div>

              {/* SALARY BADGE */}
              <div style={salaryBadge}>
                {item.salary}
              </div>

            </div>

          </div>
        ))}

      </div>

    </Layout>
  );
}

/* STYLES */
const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "15px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
};

const salaryBadge = {
  background: "#4f46e5",
  color: "white",
  padding: "8px 14px",
  borderRadius: "20px",
  fontWeight: "bold"
};

export default SalaryInsights;