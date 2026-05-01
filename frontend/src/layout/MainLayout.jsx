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
    <div style={{
      display: "flex",
      minHeight: "100vh",
      alignItems: "stretch"   // 🔥 CRITICAL FIX
    }}>
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column"
      }}>
        
        {/* HEADER */}
        <div style={{
          background: "#1f2937",
          color: "white",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h3 style={{ margin: 0 }}>{title}</h3>

          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <span>👤 {name} ({role})</span>
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "5px"
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, padding: "20px" }}>
          {children}
        </div>

        {/* FOOTER */}
        <footer style={{
          background: "#1f2937",
          color: "white",
          padding: "20px"
        }}>
          <h4>CETAT DBMS</h4>
          <p>A cloud-based system for managing participants and programs.</p>
        </footer>

      </div>
    </div>
  );
}