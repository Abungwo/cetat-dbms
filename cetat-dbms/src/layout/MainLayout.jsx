import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function MainLayout({ children, title }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "guest";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (

    <div style={{ background: "red", color: "white" }}>
    TEST HEADER

    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* HEADER */}
        <div style={{
          background: "#1f2937",
          color: "white",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

            {/* 🔥 DEBUG IMAGE BLOCK */}
            <div style={{ background: "red", padding: "5px" }}>
              <img 
                src={logo}
                alt="logo"
                style={{ width: "40px", height: "40px" }}
              />
            </div>

            <h3 style={{ margin: 0 }}>{title}</h3>
          </div>

          <div>
            <span>👤 {role}</span>
            <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
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
          CETAT DBMS
        </footer>
      </div>
    </div>
  );
}