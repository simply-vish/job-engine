// import { useNavigate } from "react-router-dom";

// function Layout({ children }) {
//   return (
//     <div style={{ display: "flex" }}>
//       {/* SIDEBAR */}
//       <div style={sidebar}>
//         <h2 style={{ marginBottom: "30px" }}>Job Engine</h2>

//         <NavItem text="Dashboard" path="/dashboard" />
//         <NavItem text="Applications" path="/applications" />
//         <NavItem text="Post Job" path="/admin/post-job" />
//         <NavItem text="Preparation Tools" path="/prep" />
//       </div>

//       {/* CONTENT */}
//       <div style={content}>
//         <div style={container}>{children}</div>
//       </div>
//     </div>
//   );
// }

// /* ✅ FIXED NAV ITEM (HOVER INSIDE JSX) */

// function NavItem({ text, path }) {
//   const navigate = useNavigate();

//   return (
//     <div
//       style={navItem}
//       onClick={() => navigate(path)}
//       onMouseEnter={(e) =>
//         (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
//       }
//       onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//     >
//       {text}
//     </div>
//   );
// }

// /* STYLES */

// const sidebar = {
//   width: "220px",
//   height: "100vh",
//   background: "linear-gradient(180deg, #6366f1, #4f46e5)",
//   color: "white",
//   padding: "20px",
//   position: "fixed",
// };

// const navItem = {
//   padding: "10px 12px",
//   borderRadius: "8px",
//   cursor: "pointer",
//   marginBottom: "6px",
//   transition: "0.2s",
// };

// const content = {
//   marginLeft: "220px",
//   width: "100%",
//   background: "#f3f4f6",
//   minHeight: "100vh",
// };

// const container = {
//   maxWidth: "900px",
//   margin: "0 auto",
//   padding: "16px",
// };

// export default Layout;


import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  return (
    <div style={container}>
      
      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2 style={{ marginBottom: "30px" }}>Job Engine</h2>

        <nav style={nav}>
          <NavItem to="/dashboard" label="Dashboard" current={location.pathname} />
          <NavItem to="/applications" label="Applications" current={location.pathname} />
          <NavItem to="/post-job" label="Post Job" current={location.pathname} />
          <NavItem to="/prep" label="Preparation Tools" current={location.pathname} />
        </nav>
      </div>

      {/* MAIN */}
      <div style={main}>
        <div style={content}>
          {children}
        </div>
      </div>

    </div>
  );
}

/* NAV ITEM (active highlight) */
function NavItem({ to, label, current }) {
  const isActive = current === to;

  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: isActive ? "#fff" : "#e0e7ff",
        fontWeight: isActive ? "600" : "400",
      }}
    >
      {label}
    </Link>
  );
}

/* LAYOUT FIX */
const container = {
  display: "flex",
  minHeight: "100vh",
};

/* SIDEBAR */
const sidebar = {
  width: "240px",
  background: "linear-gradient(180deg, #6366f1, #4f46e5)",
  color: "white",
  padding: "20px",
  flexShrink: 0, // 🔥 prevents sidebar shrinking
};

/* NAV */
const nav = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

/* MAIN WRAPPER */
const main = {
  flex: 1,                 // 🔥 takes remaining space
  display: "flex",
  justifyContent: "center",
  background: "#f3f4f6",
};

/* CONTENT CENTERED */
const content = {
  width: "100%",
  maxWidth: "1100px",     // 🔥 controls spacing
  padding: "20px",
  boxSizing: "border-box",
};

export default Layout;