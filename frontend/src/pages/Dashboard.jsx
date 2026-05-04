import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [participants, setParticipants] = useState([]);

  // FETCH PARTICIPANTS ONLY
  useEffect(() => {
    fetch("https://cetat-backend.onrender.com/api/participants")
      .then(res => res.json())
      .then(data => setParticipants(data))
      .catch(err => console.error(err));
  }, []);

  // FUNDERS FROM LOCAL STORAGE
  const funders = JSON.parse(localStorage.getItem("funders")) || [];
  const funderCount = funders.length;

  return (
    <MainLayout title="Dashboard">

      {/* TOP SECTION */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        width: "200px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        textAlign: "center"
      }}>
        
        {/* CLICKABLE CARDS */}
        <Card 
          title="Total Participants" 
          value={participants.length} 
          onClick={() => navigate("/participants")}
        />

        <Card 
          title="Funders" 
          value={funderCount} 
          onClick={() => navigate("/funders")}
        />

        {/* QUICK ACTION */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "220px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}>
          <h4>Quick Action</h4>

          <button
            style={btn}
            onClick={() => navigate("/add-participant")}
          >
            Add Participant
          </button>

          <button
            style={btn}
            onClick={() => navigate("/programs")}
          >
            Create Program
          </button>

          <button
            style={btn}
            onClick={() => navigate("/funders")}
          >
            + Add Funder
          </button>
        </div>

      </div>

    </MainLayout>
  );
}


// CLICKABLE CARD COMPONENT
function Card({ title, value, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "180px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "0.2s"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
      }}
    >
      <h2 style={{ margin: 0 }}>{value}</h2>
      <p style={{ margin: 0 }}>{title}</p>
    </div>
  );
}


// BUTTON STYLE
const btn = {
  width: "100%",
  marginTop: "10px",
  padding: "10px",
  border: "none",
  background: "#2563eb",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer"
};