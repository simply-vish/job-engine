import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Layout from "../components/Layout";

function AdminPostJob(){

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [cgpa, setCgpa] = useState("");

  const postJob = async () => {

    try {
      if(!title || !company || !category){
        alert("Please fill required fields");
        return;
      }

      await addDoc(collection(db,"jobs"),{
        title,
        company,
        category,
        location,
        salary,
        eligibilityCGPA: Number(cgpa),
        createdAt: new Date()
      });
      
      alert("Job posted successfully");

    } catch(error){
      console.log(error);
      alert("Error posting job");
    }


    setTitle("");
    setCompany("");
    setCategory("");
    setLocation("");
    setSalary("");
    setCgpa("");
  };

  const inputStyle = {
    width:"100%",
    padding:"10px",
    margin:"10px 0",
    borderRadius:"6px",
    border:"1px solid #ccc"
  };

  const buttonStyle = {
    padding:"10px",
    width:"100%",
    background:"#4f46e5",
    color:"white",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer",
    fontWeight:"bold"
  };

  return(

    <Layout>

      <div style={{
        maxWidth:"500px",
        margin:"auto",
        background:"#fff",
        padding:"20px",
        borderRadius:"10px",
        boxShadow:"0 4px 10px rgba(0,0,0,0.05)"
      }}>

        <h2>Post New Job</h2>

        <input style={inputStyle} placeholder="Job Title" value={title} onChange={(e)=>setTitle(e.target.value)} />

        <input style={inputStyle} placeholder="Company" value={company} onChange={(e)=>setCompany(e.target.value)} />

        <input style={inputStyle} placeholder="Category (internship, campus...)" value={category} onChange={(e)=>setCategory(e.target.value)} />

        <input style={inputStyle} placeholder="Location" value={location} onChange={(e)=>setLocation(e.target.value)} />

        <input style={inputStyle} placeholder="Salary" value={salary} onChange={(e)=>setSalary(e.target.value)} />

        <input style={inputStyle} placeholder="Minimum CGPA" value={cgpa} onChange={(e)=>setCgpa(e.target.value)} />

        <button style={buttonStyle} onClick={postJob}>
          Post Job
        </button>

      </div>

    </Layout>

  );

}

export default AdminPostJob;