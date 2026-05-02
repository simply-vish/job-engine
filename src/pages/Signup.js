import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      branch: branch,
      cgpa: cgpa,
      email: email,
    });

    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="auth-box">
        <h2>Signup</h2>

        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />

        <input
          placeholder="Branch"
          onChange={(e) => setBranch(e.target.value)}
        />

        <input placeholder="CGPA" onChange={(e) => setCgpa(e.target.value)} />

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}

export default Signup;
