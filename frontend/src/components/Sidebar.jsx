import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/cetat-logo.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarStyle = {
  width: "220px",
  background: "#111827",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px",
  alignSelf: "stretch",   // 🔥 THIS IS THE REAL FIX
};

  const linkStyle = {
    background: "none",
    border: "none",
    color: "white",
    textAlign: "left",
    padding: "10px",
    cursor: "pointer",
  };

  const activeStyle = {
    background: "#2563eb",
    borderRadius: "5px",
    fontWeight: "bold",
  };

  const getStyle = (path) => ({
    ...linkStyle,
    ...(location.pathname === path ? activeStyle : {}),
  });

  return (
    <div style={sidebarStyle}>
      <div style={{
        marginBottom: "30px",
        textAlign: "center"
    }}>
    <div style={{ width: "140px",
    padding: "8px",
    background: "white",
    borderRadius: "8px"}}>
    <img
        src={logo}
        alt="CETAT Logo"
        style={{
        width: "140px",
        objectFit: "contain"
        }}
    />
    </div>
      </div>

      <button style={getStyle("/dashboard")} onClick={() => navigate("/dashboard")}>
        Dashboard
      </button>

      <button style={getStyle("/participants")} onClick={() => navigate("/participants")}>
        Participants
      </button>

      <button style={getStyle("/programs")} onClick={() => navigate("/programs")}>
        Programs
      </button>

      <button style={getStyle("/funders")} onClick={() => navigate("/funders")}>
        Funders
      </button>

      <button style={getStyle("/staff")} onClick={() => navigate("/staff")}>
        Staff
      </button>

      <button style={getStyle("/reports")} onClick={() => navigate("/reports")}>
        Reports
      </button>
    </div>
  );
}