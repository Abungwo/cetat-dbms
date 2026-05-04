import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/cetat-logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    if (email === "admin@test.com") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("name", "Admin");
    } else {
      localStorage.setItem("role", "staff");
      localStorage.setItem("name", email.split("@")[0]);
    }

    navigate("/dashboard");
  };

  return (
    <div>

      {/* TOP STRIPE */}
      <div style={{
        background: "#111827",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center"
      }}>
        <img
          src={logo}
          alt="CETAT Logo"
          style={{
            height: "40px",
            width: "auto"
          }}
        />
      </div>

      {/* LOGIN FORM */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px"
      }}>
        <h3>Login</h3>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} style={btn}>
          Login
        </button>
      </div>
    </div>
  );
}

// STYLES
const inputStyle = {
  marginTop: "10px",
  padding: "10px",
  width: "220px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const btn = {
  marginTop: "15px",
  padding: "10px",
  width: "220px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};