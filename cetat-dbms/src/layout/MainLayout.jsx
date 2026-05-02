import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

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
      alignItems: "stretch",
      minHeight: "100vh"
    }}>
      <Sidebar />

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
          justifyContent: "space-between"
        }}>
          <h3><img 
            src={logo}
            alt="CETAT Logo"
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
          />
          </h3>

          <div>
            👤 {name} ({role})
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