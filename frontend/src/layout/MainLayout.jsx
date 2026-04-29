import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function MainLayout({ children, title }) {
  const role = localStorage.getItem("role");

    <span>👤 {name} ({role})</span>
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#f5f5f5"
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
            <span>👤 {name}</span>
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

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, padding: "20px" }}>
          {children}
        </div>

        {/* FOOTER */}
        <footer style={{
          background: "#1f2937",
          color: "white",
          padding: "20px",
          marginTop: "auto",
          fontSize: "0.85rem"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px"
          }}>

            <div>
              <h4>CETAT DBMS</h4>
              <p style={{ maxWidth: "250px" }}>
                A cloud-based database system designed to manage participants,
                programs, and reports efficiently.
              </p>
            </div>

            <div>
              <h4>Contact</h4>
              <p>Email: cetat@system.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>

          </div>

          <hr style={{ margin: "20px 0", borderColor: "#444" }} />

          <p style={{ textAlign: "center", color: "lightgray", fontSize: "12px" }}>
            © 2026 CETAT Database System. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  );
}