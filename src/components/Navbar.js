import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const buttonStyle = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    background: "white",
    color: "#4f46e5",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s"
  };

  const hoverStyle = (e, color) => {
    e.target.style.background = color;
    e.target.style.color = "white";
  };

  const resetStyle = (e) => {
    e.target.style.background = "white";
    e.target.style.color = "#4f46e5";
  };

  return (

    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "#4f46e5",
      color: "white",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>

      <h3
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        Job Engine
      </h3>

      <div style={{ display: "flex", gap: "15px" }}>

        <button
          style={buttonStyle}
          onMouseOver={(e)=>hoverStyle(e,"#4338ca")}
          onMouseOut={resetStyle}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button
          style={buttonStyle}
          onMouseOver={(e)=>hoverStyle(e,"#4338ca")}
          onMouseOut={resetStyle}
          onClick={() => navigate("/applications")}
        >
          My Applications
        </button>

        <button
          style={buttonStyle}
          onMouseOver={(e)=>hoverStyle(e,"#4338ca")}
          onMouseOut={resetStyle}
          onClick={() => navigate("/admin/post-job")}
        >
          Post Job
        </button>

        <button
          style={buttonStyle}
          onMouseOver={(e)=>hoverStyle(e,"#dc2626")}
          onMouseOut={resetStyle}
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;