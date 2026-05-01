import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div style={sidebar}>
      <h3 style={{ color: "white" }}>CETAT DBMS</h3>

      <button style={btn} onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button style={btn} onClick={() => navigate("/participants")}>Participants</button>
      <button style={btn} onClick={() => navigate("/programs")}>Programs</button>
      <button style={btn} onClick={() => navigate("/funders")}>Funders</button>
      <button style={btn} onClick={() => navigate("/staff")}>Staff</button>
      <button style={btn} onClick={() => navigate("/reports")}>Reports</button>
    </div>
  );
}

/* STYLES */

const sidebar = {
  width: "220px",
  background: "#111827",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignSelf: "stretch" // 🔥 THIS FIXES THE HEIGHT ISSUE
};

const btn = {
  background: "transparent",
  color: "white",
  border: "none",
  textAlign: "left",
  padding: "10px",
  cursor: "pointer",
  borderRadius: "5px"
};