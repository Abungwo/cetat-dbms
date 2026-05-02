import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH PARTICIPANTS
  useEffect(() => {
    fetch("https://cetat-backend.onrender.com/api/participants")
      .then(res => res.json())
      .then(data => setParticipants(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

 
  return (
    <MainLayout title="Dashboard">

      {/* TOP SECTION */}
      <div style={{
        display: "flex",
        gap: "20px",
        alignItems: "stretch",
        marginTop: "40px",
        flexWrap: "wrap"
      }}>
        
        <Card 
          title="Total Participants" 
          value={loading ? "..." : participants.length} 
          icon="👥"
          onClick={() => navigate("/participants")}
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

      {/* EMPTY STATE */}
      {!loading && participants.length === 0 && (
        <p style={{ marginTop: "20px" }}>
          No participants yet. Add one to get started.
        </p>
      )}

    </MainLayout>
  );
}


// CARD COMPONENT
function Card({ title, value, onClick, icon }) {
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
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        transition: "0.2s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <div style={{ fontSize: "28px" }}>
        {icon}
      </div>

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