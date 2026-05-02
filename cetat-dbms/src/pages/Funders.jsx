import { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";

export default function Funders() {
  const [funders, setFunders] = useState([]);
  const role = localStorage.getItem("role");
  const [form, setForm] = useState({
    name: "",
    program: "",
    amount: ""
  });

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("funders")) || [];
    setFunders(saved);
  }, []);

  // Add funder
  const handleAdd = () => {
    if (!form.name || !form.program || !form.amount) return;

    const updated = [...funders, form];
    setFunders(updated);

    localStorage.setItem("funders", JSON.stringify(updated));

    setForm({ name: "", program: "", amount: "" });
  };

  // Delete funder
  const handleDelete = (index) => {
    if (!window.confirm("Delete this funder?")) return;

    const updated = funders.filter((_, i) => i !== index);
    setFunders(updated);

    localStorage.setItem("funders", JSON.stringify(updated));
  };

  return (
    <MainLayout title="Funders">
      <h2>Funders</h2>

      {/* FORM */}
      <div style={{ marginBottom: "100px", display: "flex", gap: "10px" }}>
        <input
          placeholder="Funder Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Program"
          value={form.program}
          onChange={(e) => setForm({ ...form, program: e.target.value })}
        />

        <input
          type="number"
          placeholder="Amount ($)"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <button onClick={handleAdd}>Add Funder</button>
      </div>

      {/* TABLE */}
      <table style={{ width: "100%", background: "white" }}>
        <thead style={{background: "black", margin: "0px 0px 20px 0px", color: "white"}}>
          <tr>
            <th>Name</th>
            <th>Program</th>
            <th>Amount ($)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {funders.map((f, index) => (
            <tr key={index}>
              <td>{f.name}</td>
              <td>{f.program}</td>
              <td>{f.amount}</td>
              <td>
            <button
            onClick={() => handleDelete(f._id)}
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