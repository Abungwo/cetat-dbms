import { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const role = localStorage.getItem("role");
  const [form, setForm] = useState({
    name: "",
    department: "",
    role: ""
  });

    useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("staff")) || [];
  setStaff(saved);
}, []);


 const handleAdd = () => {
  if (!form.name) return;

  const updated = [...staff, form];
  setStaff(updated);

  localStorage.setItem("staff", JSON.stringify(updated));

  setForm({ name: "", department: "", role: "" });
};

 const handleDelete = (index) => {
  if (!window.confirm("Delete this staff member?")) return;

  const updated = staff.filter((_, i) => i !== index);
  setStaff(updated);

  localStorage.setItem("staff", JSON.stringify(updated));
};


  return (
    <MainLayout title="Staff">
      <h2></h2>

      <div style={{ marginBottom: "100px", display: "flex", gap: "10px"}}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <input
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <button onClick={handleAdd}>Add Staff</button>
      </div>

      <table style={{ width: "100%", background: "white" }}>
        <thead style={{background: "black", margin: "0px 0px 20px 0px", color: "white"}}>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((s, index) => (
            <tr key={index}>
              <td>{s.name}</td>
              <td>{s.department}</td>
              <td>{s.role}</td>
              <td>
                <button
                onClick={() => handleDelete(s._id)}
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