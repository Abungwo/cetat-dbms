import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

export default function Participants() {
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  const role = localStorage.getItem("role") || "admin";

  useEffect(() => {
    fetch("http://localhost:5000/api/participants")
      .then((res) => res.json())
      .then((data) => setParticipants(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await fetch(`http://localhost:5000/api/participants/${id}`, {
        method: "DELETE",
      });

      setParticipants(participants.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout title="Participants">
      

      {role === "admin" && (
        <button onClick={() => navigate("/add-participant")}>
          + Add Participant
        </button>
      )}

      <table style={{ width: "100%", marginTop: "100px", background: "white" }}>
        <thead style={{ background: "black", color: "white" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Program</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {participants.map((p) => (
            <tr key={p._id}>
              <td>{p.first_name} {p.last_name}</td>
              <td>{p.email}</td>
              <td>{p.program}</td>
              <td>{p.status}</td>
              <td>
                {role === "admin" && (
                  <>
                    <button onClick={() => navigate(`/edit-participant/${p._id}`)}>
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      style={{ marginLeft: "10px", background: "red" }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}
