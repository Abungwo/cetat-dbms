import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [participants, setParticipants] = useState([]);
  const [programs, setPrograms] = useState([]);

  // 🔥 FETCH BOTH DATA SOURCES
  useEffect(() => {
    // Participants
    fetch("https://cetat-backend.onrender.com/api/participants")
      .then(res => res.json())
      .then(data => setParticipants(data))
      .catch(err => console.error(err));

    // Programs
    fetch("https://cetat-backend.onrender.com/api/programs")
      .then(res => res.json())
      .then(data => setPrograms(data))
      .catch(err => console.error(err));

  }, []);

  // ✅ CORRECT COUNTS
  const programCount = programs.length;

  // ✅ OPTIONAL: funders from localStorage
  const funders = JSON.parse(localStorage.getItem("funders")) || [];
  const funderCount = funders.length;

  // ✅ RECENT ACTIVITY
  const recentParticipants = [...participants]
    .slice(-5)
    .reverse();

  return (
    <MainLayout title="Dashboard">

      {/* TOP SECTION */}
      <div style={{
        display: "flex",
        gap: "20px",
        alignItems: "stretch",
        marginTop: "40px"
      }}>
        
        <Card title="Total Participants" value={participants.length} />
        <Card title="Active Programs" value={programCount} />
        <Card title="Funders" value={funderCount} />

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
            style={{ width: "100%", marginTop: "10px" }}
            onClick={() => navigate("/add-participant")}
          >
            Add Participant
          </button>

          <button
            style={{ width: "100%", marginTop: "10px" }}
            onClick={() => navigate("/programs")}
          >
            Create Program
          </button>

          <button
            style={{ width: "100%", marginTop: "10px" }}
            onClick={() => navigate("/funders")}
          >
            + Add Funder
          </button>
        </div>

      </div>

      

    </MainLayout>
  );
}


// CARD COMPONENT
function Card({ title, value }) {
  return (
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      width: "180px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h2>{value}</h2>
      <p>{title}</p>
    </div>
  );
}