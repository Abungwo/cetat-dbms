import { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const role = localStorage.getItem("role");
  const [form, setForm] = useState({
    name: "",
    start_date: "",
    end_date: ""
  });

  // ✅ Fetch programs from backend
  const fetchPrograms = () => {
    fetch("http://localhost:5000/api/programs")
      .then(res => res.json())
      .then(data => setPrograms(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // ✅ Add program (BACKEND)
  const handleAdd = async () => {
    if (!form.name) return;

    try {
      const res = await fetch("http://localhost:5000/api/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          start_date: form.start_date,
          end_date: form.end_date,
          status: "Active"
        })
      });

      const newProgram = await res.json();

      // Update UI
      setPrograms([...programs, newProgram]);

      // Reset form
      setForm({ name: "", start_date: "", end_date: "" });

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete program (BACKEND)
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this program?")) return;

    try {
      await fetch(`https://github.com/Abungwo/cetat-dbms.git/api/programs/${id}`, {
        method: "DELETE"
      });

      // Update UI
      setPrograms(programs.filter(p => p._id !== id));

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout title="Programs">
      <h2>Programs</h2>

      {/* ADD PROGRAM */}
      <div style={{ marginBottom: "100px", display: "flex", gap: "10px"}}>
        <input
          placeholder="Program Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
        type="date"
        value={form.start_date}
        onChange={(e) =>
            setForm({ ...form, start_date: e.target.value })
        }
        />

        <input
        type="date"
        value={form.end_date}
        onChange={(e) =>
            setForm({ ...form, end_date: e.target.value })
        }
        />

        <button onClick={handleAdd}>Add Program</button>
      </div>

      {/* TABLE */}
      <table style={{ width: "100%", background: "white" }}>
        <thead style={{background: "black", margin: "0px 0px 20px 0px", color: "white"}}>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {programs.map((p, index) => (
            <tr key={index}>
              <td>{p.name}</td>
              <td>{new Date(p.start_date).toLocaleDateString()}</td>
              <td>{new Date(p.end_date).toLocaleDateString()}</td>
              <td>{p.status}</td>
              <td>
                <button
                    onClick={() => handleDelete(p._id)}
                    disabled={role !== "admin"}
                    style={{
                        background: role === "admin" ? "#ef4444" : "gray",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: role === "admin" ? "pointer" : "not-allowed",
                        borderRadius: "5px"
                    }}
                    >
                    Delete
                    </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}