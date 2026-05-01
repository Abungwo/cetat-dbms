import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div style={sidebar}>
      <h3 style={{ color: "white" }}>CETAT DBMS</h3>

      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate("/participants")}>Participants</button>
      <button onClick={() => navigate("/programs")}>Programs</button>
      <button onClick={() => navigate("/funders")}>Funders</button>
      <button onClick={() => navigate("/staff")}>Staff</button>
      <button onClick={() => navigate("/reports")}>Reports</button>
    </div>
  );
}

const sidebar = {
  width: "220px",
  background: "#111827",
  color: "white",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignSelf: "stretch"
};