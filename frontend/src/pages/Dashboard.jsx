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
        display: "flex",
        gap: "15px",
        marginTop: "20px",
        flexWrap: "wrap",
        justifyContent: "center"   // ✅ centers cards
      }}>
        <Card 
          title="Participants" 
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
          marginTop: "20px",
          background: "white",
          padding: "15px",
          borderRadius: "8px",
          width: "200px",
          border: "1px solid #e5e7eb"
        }}>
          <h4 style={{ marginTop: 0 }}>Quick Actions</h4>

          <button style={btn} onClick={() => navigate("/add-participant")}>
            Add Participant
          </button>

          <button style={btn} onClick={() => navigate("/programs")}>
            Create Program
          </button>

          <button style={btn} onClick={() => navigate("/funders")}>
            Add Funder
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
          padding: "15px",
          borderRadius: "8px",
          width: "160px",
          border: "1px solid #e5e7eb",
          cursor: "pointer"
        }}
      >
        <h2 style={{ margin: "0 0 5px 0" }}>{value}</h2>
        <p style={{ margin: 0, color: "#555" }}>{title}</p>
      </div>
    );
  }


// BUTTON STYLE
const btn = {
  width: "100%",
  marginTop: "8px",
  padding: "10px",
  border: "none",
  background: "#2563eb",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500"
};