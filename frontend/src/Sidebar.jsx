import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div style={sidebarStyle}>
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

const sidebarStyle = {
  width: "220px",
  minHeight: "100vh",   // ✅ allows growth
  background: "#111827",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px",
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