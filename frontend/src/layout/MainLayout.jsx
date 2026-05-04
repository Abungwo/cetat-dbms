import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/cetat-logo.png";

export default function MainLayout({ children, title }) {
  const navigate = useNavigate();

  const role = localStorage.getItem("role") || "staff";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh"
    }}>
      <Sidebar />

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        margin: "20px",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        overflow: "hidden",
        background: "#f9fafb"
      }}>
        
        {/* HEADER */}
        <div style={{
          background: "#111827",
          color: "white",
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img 
              src={logo}
              alt="CETAT Logo"
              style={{
                height: "40px",
                width: "auto",     
                objectFit: "contain",
                borderRadius: "8px"
              }}
            />
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
              {title}
            </h3>
          </div>

          {/* SHOW ONLY ROLE */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontWeight: "500" }}>
              👤 {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>

            <button onClick={handleLogout}>
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
          background: "#111827",
          color: "#d1d5db",
          padding: "18px",
          textAlign: "center",
          letterSpacing: "0.3px",
          fontSize: "14px",
          borderTop: "1px solid #e5e7eb"
        }}>
          © {new Date().getFullYear()} CETAT DBMS | Group 2, Course - INT-2840-RE02.2026SP - PGCC
        </footer>
      </div>
    </div>
  );
}