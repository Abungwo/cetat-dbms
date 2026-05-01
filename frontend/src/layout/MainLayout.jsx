import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function MainLayout({ children, title }) {
  const navigate = useNavigate();

  const name = localStorage.getItem("name") || "User";
  const role = localStorage.getItem("role") || "staff";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={layout}>
      {/* Sidebar */}
      <Sidebar />

      {/* Right side */}
      <div style={right}>
        {/* Header */}
        <div style={header}>
          <h3 style={{ margin: 0 }}>{title}</h3>

          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <span>👤 {name} ({role})</span>
            <button onClick={handleLogout} style={logoutBtn}>
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={content}>
          {children}
        </div>

        {/* Footer */}
        <footer style={footer}>
          <h4>CETAT DBMS</h4>
          <p>A cloud-based system for managing participants and programs.</p>
        </footer>
      </div>
    </div>
  );
}

/* STYLES */

const layout = {
  display: "flex",
  alignItems: "stretch", // 🔥 CRITICAL
  minHeight: "100vh"
};

const right = {
  flex: 1,
  display: "flex",
  flexDirection: "column"
};

const header = {
  background: "#1f2937",
  color: "white",
  padding: "15px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const content = {
  flex: 1,
  padding: "20px"
};

const footer = {
  background: "#1f2937",
  color: "white",
  padding: "20px"
};

const logoutBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "5px"
};