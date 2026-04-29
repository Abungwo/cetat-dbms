import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

export default function EditParticipant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    program: "",
    status: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/participants`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p._id === id);
        if (found) setForm(found);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/api/participants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Participant updated!");
    navigate("/participants");
  };

  return (
    <MainLayout title="Edit Participant">
      

    <div style={{
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    gap: "10px"
    }}>
    <input style={{ width: "100%" }} name="first_name" value={form.first_name} onChange={handleChange} />
    <input style={{ width: "100%" }} name="last_name" value={form.last_name} onChange={handleChange} />
    <input style={{ width: "100%" }} name="email" value={form.email} onChange={handleChange} />
    <input style={{ width: "100%" }} name="phone" value={form.phone} onChange={handleChange} />
    <input style={{ width: "100%" }} name="program" value={form.program} onChange={handleChange} />
    <input type="date" name="start_date" onChange={handleChange} />
    <input type="date" name="end_date" onChange={handleChange} />

    <button style={{ width: "50%" }} onClick={handleUpdate}>
        Update
    </button>
    </div>
    </MainLayout>
  );
}