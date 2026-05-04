import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const linkStyle = (path) => ({
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    background: location.pathname === path ? "#2563eb" : "transparent",
    color: location.pathname === path ? "white" : "#374151",
    fontWeight: location.pathname === path ? "bold" : "normal"
  });

  return (
    <div style={{
      width: "200px",
      background: "#f3f4f6",
      padding: "20px",
      minHeight: "100vh"
    }}>
      <h3>CETAT</h3>

      <div style={linkStyle("/dashboard")} onClick={() => navigate("/dashboard")}>
        Dashboard
      </div>

      <div style={linkStyle("/participants")} onClick={() => navigate("/participants")}>
        Participants
      </div>

      <div style={linkStyle("/programs")} onClick={() => navigate("/programs")}>
        Programs
      </div>

      <div style={linkStyle("/funders")} onClick={() => navigate("/funders")}>
        Funders
      </div>

      <div style={linkStyle("/reports")} onClick={() => navigate("/reports")}>
        Reports
      </div>
    </div>
  );
}