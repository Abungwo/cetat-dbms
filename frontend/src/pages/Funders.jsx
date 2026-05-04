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

  // LOAD FUNDERS
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("funders")) || [];
    setFunders(saved);
  }, []);

  // ADD FUNDER + CREATE PARTICIPANT
  const handleAdd = async () => {
    if (!form.name || !form.program || !form.amount) return;

    try {
      const newFunder = {
        name: form.name,
        program: form.program,
        amount: form.amount
      };

      // ✔ Save locally
      const updated = [...funders, newFunder];
      setFunders(updated);
      localStorage.setItem("funders", JSON.stringify(updated));

      // ✔ ALSO create participant in backend
      await fetch("https://cetat-backend.onrender.com/api/participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: form.name,
          last_name: "Funder",
          email: `${form.name.replace(/\s+/g, "").toLowerCase()}@funder.com`,
          program: form.program,
          status: "Funded"
        })
      });

      alert("Funder added and participant created");

      // reset form
      setForm({ name: "", program: "", amount: "" });

    } catch (err) {
      console.error(err);
      alert("Error adding funder");
    }
  };

  // DELETE FUNDER
  const handleDelete = (index) => {
    if (!window.confirm("Delete this funder?")) return;

    const updated = funders.filter((_, i) => i !== index);
    setFunders(updated);
    localStorage.setItem("funders", JSON.stringify(updated));
  };

  return (
    <MainLayout title="Funders">
      <h2 style={{ marginBottom: "30px" }}>Funders</h2>

      {/* FORM */}
      <div style={{
        marginBottom: "20px",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center" 
      }}>
        <input
          placeholder="Funder Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
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

        <button onClick={handleAdd} style={btnBlue}>
          Add Funder
        </button>
      </div>

      {/* TABLE */}
      <table style={{
        width: "100%",
        background: "white",
        borderRadius: "8px",
        overflow: "hidden"
      }}>
        <thead style={{ background: "#111", color: "white" }}>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>Program</th>
            <th style={th}>Amount ($)</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {funders.map((f, index) => (
            <tr key={index}>
              <td style={td}>{f.name}</td>
              <td style={td}>{f.program}</td>
              <td style={td}>{f.amount}</td>
              <td style={td}>
                <button
                  onClick={() => handleDelete(index)}
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


// STYLES

const inputStyle = {
  textAlign: "center",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  minWidth: "200px",
  flex: "0 1 auto"  
};

const btnBlue = {
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  display: "inline-block", 
  textAlign: "center"
};

const th = {
  padding: "10px",
  textAlign: "left"
};

const td = {
  padding: "10px",
  borderTop: "1px solid #eee",
  borderRadiu: "5px"
};